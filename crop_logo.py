import sys
from PIL import Image

def trim(im):
    # get the bounding box of non-transparent (or non-white/black) pixels
    bg = Image.new(im.mode, im.size, im.getpixel((0,0)))
    diff = Image.composite(im, bg, im) if im.mode == 'RGBA' else ImageChops.difference(im, bg)
    
    # for transparent backgrounds, just find the non-zero alpha bounding box
    if 'A' in im.mode:
        alpha = im.split()[-1]
        bbox = alpha.getbbox()
    else:
        # otherwise use diff
        import ImageChops
        diff = ImageChops.difference(im, bg)
        diff = ImageChops.add(diff, diff, 2.0, -100)
        bbox = diff.getbbox()

    if bbox:
        return im.crop(bbox)
    return im

try:
    img = Image.open('public/logo.png')
    # Since it's a PNG on dark bg, crop based on alpha
    # wait mostly ChatGPT images have a solid dark background instead of transparent?
    # Let me check if the image has a transparent background or solid background.
    # The user says "Fix the logo visibility". If it has a dark bg, cropping based on alpha won't work perfectly.
    # Actually I should crop based on non-dark colors for the bounds.
    # Let's see:
    bbox = None
    if 'A' in img.mode:
        bbox = img.split()[-1].getbbox()
    
    # if no alpha trimming, or bounding box is full image, try color diff
    if not bbox or bbox == (0, 0, img.width, img.height):
        # find bounding box of non-black/near-black pixels 
        # Convert to RGB if not already
        img_rgb = img.convert("RGB")
        # bg color from top-left pixel
        bg_color = img_rgb.getpixel((0,0))
        bg = Image.new("RGB", img_rgb.size, bg_color)
        
        from PIL import ImageChops
        diff = ImageChops.difference(img_rgb, bg)
        # Convert to greyscale and threshold
        diff_gray = diff.convert("L")
        # arbitrary threshold to ignore slight noise
        diff_mask = diff_gray.point(lambda p: 255 if p > 10 else 0)
        bbox = diff_mask.getbbox()
    
    if bbox:
        cropped_img = img.crop(bbox)
        # Add a tiny bit of padding (e.g. 5%) to avoid looking cramped
        w, h = cropped_img.size
        pad_x = int(w * 0.05)
        pad_y = int(h * 0.05)
        
        # if original image had alpha, use a transparent padded bg, else use original bg color
        if 'A' in img.mode:
            padded_img = Image.new('RGBA', (w + pad_x*2, h + pad_y*2), (0,0,0,0))
        else:
            bg_color = img.convert("RGB").getpixel((0,0))
            padded_img = Image.new(img.mode, (w + pad_x*2, h + pad_y*2), bg_color)
        
        padded_img.paste(cropped_img, (pad_x, pad_y))
        
        padded_img.save('public/logo.png')
        print(f"Successfully cropped logo. Original size: {img.size}. New size: {padded_img.size}. Bbox: {bbox}")
    else:
        print("Could not find meaningful bounding box. Image left as is.")
        
except Exception as e:
    print(f"Error processing image: {e}")
