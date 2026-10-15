import sys
import os

# Add local modules path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'py_modules'))

import qrcode
from qrcode.image.svg import SvgPathImage
from PIL import Image, ImageDraw, ImageFont

def generate_qr_assets():
    target_url = "https://skyjadstudio.github.io/mie-dokar/"
    
    # 1. Base QR Code Setup
    # Using Error Correction Level H (High - 30% recovery) so it is extremely robust and scannable even if partly smudged or framed
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=20,
        border=4,
    )
    qr.add_data(target_url)
    qr.make(fit=True)
    
    # 2. Generate standard high-res PNG (black & white, 1000x1000)
    img_qr_standard = qr.make_image(fill_color="#111827", back_color="#FFFFFF").convert("RGBA")
    
    # 3. Generate SVG vector
    qr_svg = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
        image_factory=SvgPathImage
    )
    qr_svg.add_data(target_url)
    qr_svg.make(fit=True)
    svg_img = qr_svg.make_image()
    
    # 4. Generate branded presentation card (Print ready flyer / tent card format)
    # Width: 1200, Height: 1600
    card_w, card_h = 1200, 1600
    card = Image.new("RGBA", (card_w, card_h), "#FAFAF9") # Warm light background
    draw = ImageDraw.Draw(card)
    
    # Header banner (Brand Red)
    header_h = 320
    draw.rectangle([(0, 0), (card_w, header_h)], fill="#991B1B") # Dokar deep red
    # Accent gold line
    draw.rectangle([(0, header_h - 10), (card_w, header_h)], fill="#F59E0B")
    
    # Center white container card for QR
    qr_box_margin = 120
    qr_box_top = 240
    qr_box_w = card_w - (qr_box_margin * 2) # 960
    qr_box_h = 960
    
    # Draw shadow / rounded container
    draw.rounded_rectangle(
        [(qr_box_margin, qr_box_top), (qr_box_margin + qr_box_w, qr_box_top + qr_box_h)],
        radius=36,
        fill="#FFFFFF",
        outline="#E5E7EB",
        width=3
    )
    
    # Resize QR to fit nicely inside container
    qr_size_in_card = 800
    qr_resized = img_qr_standard.resize((qr_size_in_card, qr_size_in_card), Image.Resampling.LANCZOS)
    qr_paste_x = qr_box_margin + (qr_box_w - qr_size_in_card) // 2
    qr_paste_y = qr_box_top + 80
    card.paste(qr_resized, (qr_paste_x, qr_paste_y), qr_resized)
    
    # Try loading clean font or fallback to default
    try:
        # macOS system fonts
        font_brand_title = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 68)
        font_brand_sub = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 34)
        font_scan_cta = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 46)
        font_url = ImageFont.truetype("/System/Library/Fonts/Supplemental/Courier New Bold.ttf", 38)
        font_footer = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 30)
    except Exception:
        font_brand_title = ImageFont.load_default()
        font_brand_sub = ImageFont.load_default()
        font_scan_cta = ImageFont.load_default()
        font_url = ImageFont.load_default()
        font_footer = ImageFont.load_default()
        
    # Draw text in Header
    title_text = "MIE RESHIK CAP DOKAR"
    sub_text = "PABRIK MIE BASAH & KERING BERKUALITAS"
    
    # Text anchors: 'mm' centers both horizontally and vertically
    draw.text((card_w // 2, 90), title_text, fill="#FFFFFF", font=font_brand_title, anchor="mm")
    draw.text((card_w // 2, 160), sub_text, fill="#FEF08A", font=font_brand_sub, anchor="mm")
    
    # Call to Action below QR container
    draw.text((card_w // 2, 1260), "SCAN UNTUK KUNJUNGI WEBSITE", fill="#1F2937", font=font_scan_cta, anchor="mm")
    
    # Website URL Badge
    url_text = "skyjadstudio.github.io/mie-dokar"
    badge_w = 780
    badge_h = 70
    badge_x0 = (card_w - badge_w) // 2
    badge_y0 = 1320
    draw.rounded_rectangle(
        [(badge_x0, badge_y0), (badge_x0 + badge_w, badge_y0 + badge_h)],
        radius=20,
        fill="#F3F4F6",
        outline="#D1D5DB",
        width=2
    )
    draw.text((card_w // 2, badge_y0 + (badge_h // 2)), url_text, fill="#991B1B", font=font_url, anchor="mm")
    
    # Bottom Footer Features
    footer_text = "Katalog Produk · Simulasi Keuntungan · Hubungi Sales Pabrik"
    draw.text((card_w // 2, 1460), footer_text, fill="#6B7280", font=font_footer, anchor="mm")
    
    # Convert card to RGB for JPG/PNG saving
    card_rgb = card.convert("RGB")
    
    # Directories
    pub_dir = "/Users/skyjad/Documents/memoria/dokar-product-knowledge/public/images"
    art_dir = "/Users/skyjad/.gemini/antigravity/brain/2cf0fe8e-c1b0-4cae-86d6-48103af187b8"
    os.makedirs(pub_dir, exist_ok=True)
    os.makedirs(art_dir, exist_ok=True)
    
    # Save standard PNG
    img_qr_standard.save(os.path.join(pub_dir, "qr-code-mie-dokar.png"))
    img_qr_standard.save(os.path.join(art_dir, "qr-code-mie-dokar.png"))
    
    # Save SVG
    svg_img.save(os.path.join(pub_dir, "qr-code-mie-dokar.svg"))
    svg_img.save(os.path.join(art_dir, "qr-code-mie-dokar.svg"))
    
    # Save branded Card
    card_rgb.save(os.path.join(pub_dir, "qr-code-mie-dokar-card.png"), quality=95)
    card_rgb.save(os.path.join(art_dir, "qr-code-mie-dokar-card.png"), quality=95)
    
    print("SUCCESS: Generated QR code assets:")
    print(f"- Standard PNG: {pub_dir}/qr-code-mie-dokar.png")
    print(f"- Vector SVG:   {pub_dir}/qr-code-mie-dokar.svg")
    print(f"- Branded Card: {pub_dir}/qr-code-mie-dokar-card.png")

if __name__ == "__main__":
    generate_qr_assets()
