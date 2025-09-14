curl -X POST https://ark.ap-southeast.bytepluses.com/api/v3/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ARK_API_KEY" \
  -d '{
    "model": "seedream-4-0-250828",
    "prompt": "Replace the clothing in image 1 with the outfit from image 2.",
    "image": ["https://ark-doc.tos-ap-southeast-1.bytepluses.com/doc_image/seedream4_imagesToimage_1.png", "https://ark-doc.tos-ap-southeast-1.bytepluses.com/doc_image/seedream4_imagesToimage_2.png"],
    "sequential_image_generation": "disabled",
    "response_format": "url",
    "size": "2K",
    "stream": false,
    "watermark": false
}'