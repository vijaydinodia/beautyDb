const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

function categorizeProduct(title) {
  const t = title.toLowerCase();
  if (t.includes('mascara')) return 'mascara';
  if (t.includes('eyeshadow')) return 'eyeshadow';
  if (t.includes('powder') || t.includes('canister')) return 'powder';
  if (t.includes('lipstick')) return 'lipstick';
  if (t.includes('nail')) return 'nail';
  if (t.includes('foundation') || t.includes('bb cream')) return 'foundation';
  if (t.includes('lip gloss') || t.includes('lip tint') || t.includes('lip plump')) return 'lipgloss';
  if (t.includes('eyeliner') || t.includes('kajal')) return 'eyeliner';
  if (t.includes('blush')) return 'blush';
  if (t.includes('setting spray') || t.includes('spray')) return 'spray';
  if (t.includes('concealer') || t.includes('corrector')) return 'concealer';
  if (t.includes('brow') || (t.includes('pencil') && t.includes('brow'))) return 'brow';
  if (t.includes('highlighter')) return 'highlighter';
  if (t.includes('primer')) return 'primer';
  if (t.includes('bronz') || t.includes('contour')) return 'bronzer';
  if (t.includes('brush') || t.includes('sponge') || t.includes('blender') || t.includes('puff') || t.includes('curler')) return 'tool';
  if (t.includes('remover') || t.includes('cleansing') || t.includes('cleanser')) return 'skincare';
  if (t.includes('mirror') || t.includes('organizer') || t.includes('bag') || t.includes('lash') || t.includes('eyelash')) return 'accessory';
  if (t.includes('strengthener')) return 'nail';
  if (t.includes('lip liner')) return 'lipstick';
  return 'general';
}

const faqPools = {
  mascara: [
    { question: "Is this mascara waterproof?", answer: "This mascara is formulated to be water-resistant, helping it stay in place throughout the day. However, it can be removed easily with a gentle eye makeup remover or micellar water without harsh rubbing." },
    { question: "Does it clump on the lashes?", answer: "No, this mascara features a specially designed formula that coats each lash evenly without clumping. The brush separates lashes for a smooth, defined look with every application." },
    { question: "How long does the mascara last without smudging?", answer: "This mascara is designed to last up to 12 hours without smudging, flaking, or fading. It maintains its volume and length throughout the day, even in humid conditions." },
    { question: "Is it suitable for sensitive eyes or contact lens wearers?", answer: "Yes, this mascara is ophthalmologist-tested and suitable for sensitive eyes and contact lens wearers. It is free from harsh irritants and has been formulated to minimize the risk of eye irritation." },
    { question: "How do I remove this mascara properly?", answer: "For best results, use a gentle eye makeup remover or micellar water on a cotton pad. Press it against your closed eyelid for a few seconds, then gently wipe downward. Avoid rubbing to protect your lashes." },
    { question: "Can I layer this mascara for extra volume?", answer: "Absolutely! This mascara is buildable, so you can apply multiple coats to achieve your desired level of volume and length without the formula becoming heavy or flaky." },
    { question: "Does it contain any fibers for lengthening?", answer: "Yes, this mascara contains microfibers that adhere to your natural lashes, creating an extended lengthening effect while maintaining a natural appearance without feeling stiff." }
  ],
  eyeshadow: [
    { question: "Is this eyeshadow highly pigmented?", answer: "Yes, this eyeshadow delivers rich, highly pigmented color in a single swipe. The formula is designed to provide intense color payoff that stays true throughout the day." },
    { question: "Can it be used wet or dry?", answer: "This eyeshadow is versatile and can be applied both wet and dry. When applied dry, it gives a soft, blendable finish. When used wet, it delivers a more intense, metallic effect." },
    { question: "Is it suitable for sensitive skin around the eyes?", answer: "Yes, this eyeshadow is dermatologist-tested and formulated without harsh chemicals, making it safe for sensitive skin around the delicate eye area." },
    { question: "How long does the color last?", answer: "With proper application over a primer, this eyeshadow can last up to 10-12 hours without creasing or fading. It is formulated with long-wear technology for all-day color retention." },
    { question: "Does it crease throughout the day?", answer: "This eyeshadow is crease-resistant and stays smooth on the eyelid for hours. For best results, apply an eyeshadow primer beforehand to extend wear time even further." },
    { question: "Is the shimmer fallout-free?", answer: "The formula is designed to minimize fallout during application. The shimmer particles are finely milled and adhere well to the skin, reducing mess and ensuring a clean application." },
    { question: "Can beginners blend this eyeshadow easily?", answer: "Yes, this eyeshadow has a buttery, blendable texture that is very forgiving and easy to work with, making it ideal for beginners who are learning blending techniques." }
  ],
  powder: [
    { question: "Does this powder control oil effectively?", answer: "Yes, this powder is specifically formulated to absorb excess oil and control shine throughout the day. It keeps your complexion looking fresh and matte for up to 8 hours." },
    { question: "Is it suitable for daily use?", answer: "Absolutely! This powder is lightweight and gentle enough for everyday use. It sets makeup without feeling heavy or cakey, making it perfect for your daily beauty routine." },
    { question: "Does it leave a white cast on deeper skin tones?", answer: "No, this powder is designed with a translucent formula that blends seamlessly into all skin tones without leaving any white cast or ashy residue." },
    { question: "Is this powder lightweight on the skin?", answer: "Yes, this finely milled powder feels weightless on the skin. It provides a smooth, natural finish without adding any heaviness or cakiness to your makeup." },
    { question: "How long does the matte finish last?", answer: "The matte finish from this powder typically lasts between 6 to 8 hours, depending on skin type. For oily skin, a light touch-up at midday will keep your look fresh all day." },
    { question: "Can I use this powder for baking?", answer: "Yes, this powder works excellently for the baking technique. Apply a generous amount to the under-eye area and let it sit for a few minutes before dusting off for a flawless, creaseless finish." },
    { question: "Does it set liquid foundation well?", answer: "This powder is excellent at setting liquid and cream foundations. It locks in your base makeup, extends wear time, and helps prevent creasing and fading throughout the day." }
  ],
  lipstick: [
    { question: "Is this lipstick transfer-proof?", answer: "This lipstick is formulated with long-wear technology that significantly reduces transfer. While it may leave minimal marks, it holds its color beautifully throughout eating, drinking, and daily activities." },
    { question: "Is the finish matte or glossy?", answer: "This lipstick offers a luxurious satin finish that strikes a perfect balance between matte and glossy. It provides rich color with a slight sheen for a polished, elegant look." },
    { question: "How long does the color stay on the lips?", answer: "This lipstick is formulated to last up to 8 hours with normal wear. It maintains its vibrant color throughout the day, though a light touch-up may be needed after heavy meals." },
    { question: "Is this lipstick moisturizing?", answer: "Yes, this lipstick is infused with hydrating ingredients like Shea Butter and Vitamin E that keep your lips moisturized and comfortable all day without drying them out." },
    { question: "Is it suitable for everyday use?", answer: "Absolutely! This lipstick features a lightweight, comfortable formula that is gentle on lips and perfect for daily wear. Its nourishing ingredients ensure your lips stay soft with regular use." },
    { question: "Does it bleed or feather outside the lip line?", answer: "No, this lipstick is designed with a creamy yet precise formula that stays within the lip line. For extra precision, you can pair it with a lip liner to prevent any feathering." },
    { question: "Is the shade suitable for all skin tones?", answer: "This shade is universally flattering and complements a wide range of skin tones. It has warm and neutral undertones that enhance your natural lip color beautifully." }
  ],
  nail: [
    { question: "Is this nail polish quick drying?", answer: "Yes, this nail polish features a quick-dry formula that sets within 60 seconds of application. A full cure is achieved within 5 minutes, so you can get back to your routine quickly." },
    { question: "How many coats are recommended for best results?", answer: "For optimal color and coverage, we recommend applying two thin coats. Allow each coat to dry for about a minute before applying the next to achieve the best finish." },
    { question: "Is it chip-resistant?", answer: "Yes, this nail polish is formulated with a chip-resistant technology that helps the color stay intact for up to 7 days with proper application and a top coat." },
    { question: "How long does the polish last on nails?", answer: "With proper application including a base coat and top coat, this polish can last up to 7-10 days without significant chipping or fading, even with daily activities." },
    { question: "How do I remove this nail polish?", answer: "This nail polish can be easily removed with any standard acetone or non-acetone nail polish remover. Soak a cotton pad and press it onto the nail for a few seconds before wiping clean." },
    { question: "Is it free from harmful chemicals?", answer: "Yes, this nail polish is formulated without the most common harmful chemicals. It is free from formaldehyde, toluene, and DBP, making it a safer choice for regular use." },
    { question: "Can I use it without a base coat?", answer: "While the polish applies well on bare nails, we recommend using a base coat for the longest wear time and to protect your natural nails from potential staining." }
  ],
  foundation: [
    { question: "Is this foundation suitable for oily skin?", answer: "This foundation works well on all skin types including oily skin. Its lightweight formula helps control excess shine while providing even coverage without clogging pores." },
    { question: "What level of coverage does it provide?", answer: "This foundation offers medium buildable coverage. You can apply a single layer for a natural, skin-like finish or build it up for more coverage without it looking cakey." },
    { question: "Does it oxidize or change color after application?", answer: "This foundation is formulated to resist oxidation, so it stays true to its shade after application. We recommend testing the shade on your jawline to ensure the best match." },
    { question: "Is the coverage buildable?", answer: "Yes, this foundation is designed to be buildable. You can layer it to increase coverage in specific areas like blemishes or dark spots while maintaining a smooth, natural finish." },
    { question: "Does it contain SPF for sun protection?", answer: "This foundation contains a lightweight formula but does not include SPF. We recommend applying a separate sunscreen underneath your foundation for adequate sun protection." },
    { question: "How should I apply it for the best result?", answer: "For the most natural finish, apply this foundation with a damp beauty sponge using a stippling motion. You can also use a foundation brush for a more full-coverage look." },
    { question: "Is it suitable for dry skin?", answer: "Yes, this foundation contains hydrating ingredients like Glycerin and Hyaluronic Acid that keep your skin moisturized and prevent the foundation from settling into dry patches." }
  ],
  lipgloss: [
    { question: "Is this lip gloss sticky?", answer: "No, this lip gloss features a non-sticky, lightweight formula that feels comfortable on the lips. It provides a glossy shine without the tacky or heavy feeling of traditional lip glosses." },
    { question: "Does it provide any color or is it clear?", answer: "This lip gloss offers a beautiful tinted color that enhances your natural lip tone. It provides a sheer wash of buildable color along with a high-shine finish." },
    { question: "Can it be worn over lipstick?", answer: "Yes, this lip gloss layers beautifully over any lipstick to add dimension and shine. It can also be worn alone for a glossy, natural look that enhances your lips." },
    { question: "Is it hydrating for the lips?", answer: "Absolutely! This lip gloss is enriched with nourishing ingredients like Jojoba Oil and Vitamin E that moisturize and condition the lips while providing a gorgeous shine." },
    { question: "How long does the shine last?", answer: "The high-shine finish of this gloss typically lasts 3-4 hours with normal wear. Reapplication is easy and comfortable, and the hydrating formula keeps lips conditioned between applications." },
    { question: "Does it contain any plumping ingredients?", answer: "This lip gloss contains gentle plumping agents that create a subtle fullness to the lips. The effect is noticeable but comfortable, without any stinging or irritation." },
    { question: "Is it safe for sensitive lips?", answer: "Yes, this lip gloss is dermatologist-tested and free from common irritants. Its gentle, nourishing formula is suitable for those with sensitive lips or those prone to dryness." }
  ],
  eyeliner: [
    { question: "Is this eyeliner waterproof?", answer: "Yes, this eyeliner is waterproof and designed to resist smudging from water, sweat, and humidity. It stays precisely where you apply it for long-lasting, clean lines throughout the day." },
    { question: "Is it easy to apply for beginners?", answer: "This eyeliner features a smooth, glide-on formula that makes application easy even for beginners. The precise tip allows for controlled, effortless lines with minimal practice." },
    { question: "Does it smudge or transfer during the day?", answer: "No, this eyeliner is formulated with smudge-proof technology that keeps your lines sharp and intact throughout the day. It resists transfer from rubbing and natural eye movement." },
    { question: "Can I create a winged look with this eyeliner?", answer: "Absolutely! The fine, precise tip of this eyeliner is perfect for creating winged or cat-eye looks. Its smooth formula allows for clean, defined lines and sharp wing tips." },
    { question: "How do I remove this waterproof eyeliner?", answer: "Use an oil-based or waterproof makeup remover with a cotton pad. Gently press it against your closed eyelid for a few seconds to dissolve the formula, then wipe away without harsh rubbing." },
    { question: "Is it suitable for the waterline?", answer: "Yes, this eyeliner is safe for use on the waterline. Its smooth, creamy texture glides on comfortably and is ophthalmologist-tested for use near the eye area." },
    { question: "How long does it last without retouching?", answer: "This eyeliner is designed to last up to 12 hours without needing any touch-ups. Its long-wear formula ensures your eye look stays fresh from morning to evening." }
  ],
  blush: [
    { question: "Is this blush highly pigmented?", answer: "Yes, this blush offers rich pigmentation that delivers vibrant color in just one swipe. A little goes a long way, and it can be built up gradually for your desired intensity." },
    { question: "Can beginners use this blush easily?", answer: "Absolutely! This blush has a silky, blendable texture that is very forgiving and easy to work with. Even if you over-apply, it blends out beautifully for a natural-looking flush." },
    { question: "Is it suitable for all skin tones?", answer: "Yes, this blush is designed to complement a wide range of skin tones. Its versatile shade provides a beautiful flush on fair to deep complexions when applied with a light hand." },
    { question: "Does it contain shimmer or is it matte?", answer: "This blush features a satin finish with a subtle luminosity that gives a healthy, natural-looking glow. It is not overly shimmery but provides a beautiful lit-from-within effect." },
    { question: "Is this blush long-lasting?", answer: "Yes, this blush is formulated for long-lasting wear that stays fresh and vibrant for up to 8 hours. It resists fading and maintains its beautiful color throughout the day." },
    { question: "Can I use it as an eyeshadow too?", answer: "Yes, this blush is multi-purpose and can be used on the eyes as well. Its soft, blendable formula works beautifully as a monochromatic eyeshadow for a cohesive, harmonious look." },
    { question: "Does it work well on dry skin?", answer: "This blush is enriched with skin-conditioning ingredients that keep it smooth and blendable on all skin types, including dry skin. It will not emphasize dry patches or flakiness." }
  ],
  spray: [
    { question: "How long does this setting spray extend makeup wear?", answer: "This setting spray extends makeup wear by up to 8-10 additional hours. It creates an invisible shield over your makeup to lock everything in place and prevent fading or smudging." },
    { question: "Is it suitable for all skin types?", answer: "Yes, this setting spray is formulated for all skin types including oily, dry, and combination skin. Its lightweight, non-greasy formula works without clogging pores or causing breakouts." },
    { question: "Does it leave a sticky or shiny finish?", answer: "No, this setting spray dries down to a natural, weightless finish. It does not leave any sticky, tacky, or overly shiny residue on the skin." },
    { question: "Can I use it to refresh my makeup during the day?", answer: "Absolutely! This spray doubles as a refreshing mist. Spritz it over your makeup throughout the day to revive your look and keep it looking freshly applied." },
    { question: "Does it help control oil throughout the day?", answer: "Yes, this setting spray includes oil-absorbing properties that help control shine and excess oil production. It keeps your complexion looking matte and fresh, especially in the T-zone area." },
    { question: "How far should I hold the bottle when spraying?", answer: "Hold the bottle about 8-10 inches from your face and spray in an X and T motion for even coverage. Close your eyes while spraying and let it air dry for the best results." },
    { question: "Is it hydrating for dry skin?", answer: "Yes, this setting spray contains hydrating ingredients like Glycerin and Aloe Vera that help keep the skin moisturized while locking makeup in place, making it great for dry skin types." }
  ],
  concealer: [
    { question: "Does this concealer provide full coverage?", answer: "Yes, this concealer offers full, buildable coverage that effectively hides dark circles, blemishes, and discoloration. You can use a thin layer for a natural look or build up for maximum coverage." },
    { question: "Is it suitable for under-eye use?", answer: "Absolutely! This concealer is specifically formulated for the delicate under-eye area. Its hydrating formula prevents creasing and settling into fine lines for a smooth, brightened finish." },
    { question: "Does it crease or settle into fine lines?", answer: "This concealer is formulated with a crease-resistant technology that keeps it smooth and flawless throughout the day. For best results, set it with a light dusting of translucent powder." },
    { question: "Can I use it to cover blemishes?", answer: "Yes, this concealer works excellently on blemishes, redness, and dark spots. Its pigmented formula provides targeted coverage that blends seamlessly with your foundation for a flawless finish." },
    { question: "Is it long-lasting throughout the day?", answer: "This concealer is designed to last up to 12 hours with proper application. It maintains its coverage and brightness without fading, so your skin looks flawless from morning to night." },
    { question: "Does it match well with different foundation shades?", answer: "This concealer is designed to blend seamlessly with most foundation shades. For under-eye brightening, choose a shade 1-2 levels lighter than your foundation. For blemishes, match it exactly." },
    { question: "Is it suitable for sensitive skin?", answer: "Yes, this concealer is dermatologist-tested and free from harsh irritants. Its gentle, non-comedogenic formula is safe for sensitive skin and will not cause breakouts or irritation." }
  ],
  brow: [
    { question: "Does this brow product look natural on the brows?", answer: "Yes, this brow product is designed to mimic the appearance of natural brow hairs. Its fine tip allows for precise, hair-like strokes that fill in sparse areas without looking drawn on." },
    { question: "Is it easy to blend and shape?", answer: "Absolutely! This product features a smooth, blendable formula that allows you to easily shape and define your brows. The built-in spoolie helps blend the product for a seamless, groomed look." },
    { question: "Is it smudge-proof throughout the day?", answer: "Yes, this brow product is formulated to be smudge-proof and water-resistant. Once set, it stays in place all day without smearing or fading, even in humid conditions." },
    { question: "Can beginners use this easily?", answer: "This brow product is very beginner-friendly. Its precise application tip makes it easy to create natural-looking strokes, and any mistakes can be easily blended out with the spoolie end." },
    { question: "How long does it last without retouching?", answer: "This brow product is designed to last up to 12 hours without retouching. Its long-wear formula ensures your brows stay defined and groomed from morning until night." },
    { question: "Does it come with a spoolie brush?", answer: "Yes, this product features a built-in spoolie brush on the opposite end for blending and grooming your brow hairs after application, making it a convenient all-in-one brow tool." },
    { question: "Is it suitable for sparse brows?", answer: "Yes, this product is excellent for filling in sparse or thin brows. Its buildable formula allows you to gradually add definition and fullness for a natural-looking result." }
  ],
  highlighter: [
    { question: "Is this highlighter highly pigmented?", answer: "Yes, this highlighter delivers an intense, luminous glow with a single swipe. Its finely milled formula provides rich pigmentation that catches the light beautifully for a radiant finish." },
    { question: "Can beginners use this highlighter?", answer: "Absolutely! This highlighter is easy to apply and blend, making it perfect for beginners. Start with a small amount on the high points of your face and build up to your desired glow." },
    { question: "Is it suitable for all skin tones?", answer: "Yes, this highlighter is designed to complement all skin tones. Its universally flattering shade adapts to your natural skin color to provide a beautiful, lit-from-within glow." },
    { question: "Does it contain shimmer or glitter?", answer: "This highlighter features a refined shimmer finish without chunky glitter. It provides a smooth, luminous glow that looks elegant and natural rather than overly sparkly." },
    { question: "Is this highlighter long-lasting?", answer: "Yes, this highlighter is formulated for long-lasting wear that maintains its radiant glow for up to 8 hours. It resists fading and stays luminous without needing touch-ups." },
    { question: "Can it be used on the body as well?", answer: "Yes, this highlighter can be applied to the body including collarbones, shoulders, and legs for an all-over radiant glow. Its versatile formula blends seamlessly on both face and body." },
    { question: "Does it work well over foundation?", answer: "This highlighter layers beautifully over any foundation. It blends seamlessly on top of your base makeup to add a luminous dimension without disturbing the foundation underneath." }
  ],
  primer: [
    { question: "Does this primer minimize the appearance of pores?", answer: "Yes, this primer creates a smoothing effect that visually minimizes the appearance of pores. It fills in fine lines and imperfections to create a flawless, even canvas for makeup application." },
    { question: "Can it be used alone without foundation?", answer: "Absolutely! This primer works beautifully on its own to smooth and even out the skin. It provides a natural, refined look and can be worn alone for a no-makeup, polished appearance." },
    { question: "Is it suitable for sensitive skin?", answer: "Yes, this primer is dermatologist-tested and formulated without harsh chemicals or fragrances. It is gentle on sensitive skin and helps create a protective barrier between your skin and makeup." },
    { question: "How long does it help makeup last?", answer: "This primer extends makeup wear by up to 8-10 hours. It creates a smooth, gripping base that helps foundation, concealer, and other products adhere better and last longer." },
    { question: "Does it feel greasy or heavy on the skin?", answer: "No, this primer has a lightweight, silky texture that feels weightless on the skin. It absorbs quickly and leaves a smooth, non-greasy finish that is comfortable to wear all day." },
    { question: "Should I apply it before or after moisturizer?", answer: "Apply this primer after your moisturizer and sunscreen have fully absorbed, but before your foundation. This ensures the primer can create the smoothest possible base for your makeup." },
    { question: "Is it compatible with both liquid and powder foundations?", answer: "Yes, this primer works well with all types of foundation including liquid, cream, and powder formulas. It creates a universal base that enhances the performance of any foundation type." }
  ],
  bronzer: [
    { question: "Does this bronzer look natural on the skin?", answer: "Yes, this bronzer is formulated with finely milled pigments that blend seamlessly into the skin for a natural, sun-kissed look. It adds warmth without looking muddy or orange." },
    { question: "Is it suitable for contouring?", answer: "Absolutely! This bronzer can be used for contouring to add definition and dimension to your face. Its blendable formula allows for precise sculpting of cheekbones, jawline, and temples." },
    { question: "Does it work on all skin tones?", answer: "Yes, this bronzer is designed to complement a wide range of skin tones. Its versatile shade adds warmth and dimension to fair, medium, and deep complexions alike." },
    { question: "Is it buildable for a deeper bronze look?", answer: "Yes, this bronzer is fully buildable. You can apply a light layer for a subtle warmth or build up the product for a more intense, sculpted bronze look without it becoming patchy." },
    { question: "Does it last throughout the day?", answer: "This bronzer is formulated for long-lasting wear that maintains its warm, sculpted finish for up to 8 hours. It resists fading and stays blended throughout the day." },
    { question: "Does it contain shimmer?", answer: "This bronzer features a natural matte-satin finish that provides warmth without obvious shimmer or glitter. It gives a realistic sun-kissed effect that looks natural in any lighting." },
    { question: "Can I use it as an eyeshadow?", answer: "Yes, this bronzer works beautifully as a warm-toned eyeshadow. Its soft, blendable formula transitions easily from face to eyes for a cohesive, monochromatic look." }
  ],
  tool: [
    { question: "Is this beauty tool reusable?", answer: "Yes, this beauty tool is designed for repeated use. With proper cleaning and care, it maintains its quality and performance for many months of daily use." },
    { question: "How should I clean this tool?", answer: "Clean this tool after every use with mild soap or a dedicated brush/sponge cleanser and warm water. Gently squeeze out excess water and lay flat to air dry completely before the next use." },
    { question: "Can beginners use this tool effectively?", answer: "Absolutely! This tool is designed to be user-friendly and intuitive for all skill levels. Its ergonomic design makes it easy for beginners to achieve professional-looking results." },
    { question: "Is it latex-free and hypoallergenic?", answer: "Yes, this tool is made from latex-free, hypoallergenic materials that are safe for all skin types, including sensitive skin. It will not cause irritation or allergic reactions." },
    { question: "How often should it be replaced?", answer: "For best hygiene and performance, we recommend replacing this tool every 3 months with regular use. Signs that it needs replacing include tears, loss of shape, or persistent staining." },
    { question: "Does it work with all types of makeup products?", answer: "Yes, this tool works beautifully with liquid, cream, and powder products. Its versatile design allows for seamless application of foundation, concealer, blush, and other makeup." },
    { question: "Is it travel-friendly?", answer: "Yes, this tool is compact and lightweight, making it perfect for travel. It comes in a convenient size that fits easily into any makeup bag or travel pouch." }
  ],
  skincare: [
    { question: "Is this product suitable for sensitive skin?", answer: "Yes, this product is formulated with gentle, soothing ingredients that are safe for sensitive skin. It is free from harsh chemicals, fragrances, and common irritants." },
    { question: "Can it be used daily?", answer: "Absolutely! This product is gentle enough for daily use as part of your morning and evening skincare routine. Regular use helps maintain clean, healthy-looking skin." },
    { question: "Does it effectively remove waterproof makeup?", answer: "Yes, this product is designed to dissolve and remove all types of makeup, including waterproof formulas. It breaks down makeup gently without harsh rubbing or tugging on the skin." },
    { question: "Is it non-comedogenic?", answer: "Yes, this product is non-comedogenic, meaning it will not clog pores. It cleanses thoroughly while respecting your skin's natural barrier, making it suitable for acne-prone skin." },
    { question: "Does it leave any residue after use?", answer: "No, this product rinses clean without leaving any greasy or filmy residue. It leaves your skin feeling fresh, soft, and thoroughly cleansed after every use." },
    { question: "Is it fragrance-free?", answer: "This product is formulated without artificial fragrances, making it ideal for those with fragrance sensitivities. It has a mild, natural scent from its botanical ingredients." },
    { question: "Can it be used around the eye area?", answer: "Yes, this product is ophthalmologist-tested and safe for use around the delicate eye area. It gently removes eye makeup without causing irritation or stinging." }
  ],
  accessory: [
    { question: "Is this accessory durable for everyday use?", answer: "Yes, this accessory is made from high-quality, durable materials that withstand daily use. It is designed to maintain its quality and functionality over long periods of regular handling." },
    { question: "Is it portable and travel-friendly?", answer: "Absolutely! This accessory is compact and lightweight, making it perfect for travel. It fits easily into any bag or purse, so you can take your beauty essentials anywhere." },
    { question: "Is it easy to clean and maintain?", answer: "Yes, this accessory is easy to clean with a damp cloth or mild cleanser. Its smooth surfaces resist buildup and maintain their appearance with minimal maintenance effort." },
    { question: "What material is it made from?", answer: "This accessory is made from premium-quality materials that are both durable and aesthetically pleasing. The materials are chosen to ensure longevity and a luxurious feel." },
    { question: "Does it come with a warranty?", answer: "This product is backed by our quality guarantee. If you experience any manufacturing defects, please contact customer support for assistance with replacement or refund." },
    { question: "Can it hold a full makeup collection?", answer: "This accessory is designed to accommodate a variety of beauty essentials. Its thoughtful compartments and spacious design allow you to organize and store multiple products conveniently." },
    { question: "Is it suitable as a gift?", answer: "Yes, this accessory comes in attractive packaging that makes it a perfect gift for beauty enthusiasts. Its stylish design and practical functionality make it a thoughtful and useful present." }
  ],
  general: [
    { question: "Is this product cruelty-free?", answer: "Yes, this product is cruelty-free and not tested on animals. We are committed to ethical beauty practices and ensuring our products are made responsibly." },
    { question: "Is it suitable for all skin types?", answer: "Yes, this product is formulated to work well on all skin types including normal, oily, dry, combination, and sensitive skin. It has been dermatologist-tested for broad compatibility." },
    { question: "How should I store this product?", answer: "Store this product in a cool, dry place away from direct sunlight and extreme temperatures. Keep the cap tightly closed after each use to maintain product freshness and longevity." },
    { question: "What is the shelf life of this product?", answer: "This product has a shelf life as indicated on the packaging. Once opened, we recommend using it within the specified period to ensure optimal quality and performance." },
    { question: "Is it suitable for everyday use?", answer: "Absolutely! This product is designed for daily use and is gentle enough for regular application. Its high-quality formula ensures consistent performance with every use." },
    { question: "Is it vegan-friendly?", answer: "Please check the product details for vegan status. Many of our products are vegan-friendly and made without animal-derived ingredients. Look for the vegan certification on the packaging." },
    { question: "Can I return it if I'm not satisfied?", answer: "Yes, we offer a satisfaction guarantee. If you are not happy with your purchase, please contact our customer support within the return window for a refund or exchange." }
  ]
};

const categoryUsageIndex = {};

function getFaqsForProduct(product) {
  const category = categorizeProduct(product.title);
  const pool = faqPools[category] || faqPools.general;

  if (!(category in categoryUsageIndex)) {
    categoryUsageIndex[category] = 0;
  }

  const faqs = [];
  const totalInPool = pool.length;
  const startIdx = categoryUsageIndex[category];

  for (let i = 0; i < 5; i++) {
    const poolIdx = (startIdx + i) % totalInPool;
    faqs.push({
      id: i + 1,
      question: pool[poolIdx].question,
      answer: pool[poolIdx].answer
    });
  }

  categoryUsageIndex[category] = (startIdx + 2) % totalInPool;

  return faqs;
}

const updatedProducts = db.products.map((product) => {
  const { createdAt, ...rest } = product;
  return {
    ...rest,
    faqs: getFaqsForProduct(product),
    createdAt
  };
});

const output = { products: updatedProducts };
fs.writeFileSync(dbPath, JSON.stringify(output, null, 2), 'utf-8');
console.log('Done! Added FAQs to ' + updatedProducts.length + ' products.');

const categorySummary = {};
db.products.forEach(p => {
  const cat = categorizeProduct(p.title);
  categorySummary[cat] = (categorySummary[cat] || 0) + 1;
});
console.log('\\nCategory breakdown:');
Object.entries(categorySummary).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log('  ' + cat + ': ' + count + ' products');
});
