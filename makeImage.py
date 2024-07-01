from wordcloud import WordCloud, ImageColorGenerator
import matplotlib.pyplot as plt
import numpy as np
from scipy.ndimage import gaussian_gradient_magnitude
from PIL import Image
from sys import argv

# Read the text from the file
with open('image.txt', 'r', encoding="utf8") as file:
    text = file.read()

# Remove special characters using regular expressions

mask_color = np.array(Image.open(argv[1]).convert("RGBA"))
contCol = "orange"
if len(argv)>2:
    contCol=argv[2]

image_mask = mask_color.copy()
image_mask[image_mask.sum(axis=2) == 0] = 255
edges = np.mean([gaussian_gradient_magnitude(mask_color[:, :, i] / 255., 2) for i in range(3)], axis=0)
image_mask[edges > .5] = 255
# Generate the word cloud
wordcloud = WordCloud(max_words=999999999999999,relative_scaling=0,max_font_size=20 , min_font_size=0.0000001,background_color='black', random_state=42,mask=image_mask, contour_color=contCol, contour_width=7).generate(text)
image_colors = ImageColorGenerator(image_mask)
wordcloud.recolor(color_func=image_colors)
wordcloud.to_file(argv[1].split(".")[0]+"wordcloud.png")
print("cloud is made")
plt.show()
plt.axis('off')