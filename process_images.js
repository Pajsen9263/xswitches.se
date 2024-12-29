const { createCanvas, loadImage } = require('canvas');
const path = require('path')
const fs = require('fs')
async function process_image() {
  try {
    const imagesDir = path.join(__dirname, 'public', 'images');
    const inputDir = path.join(__dirname, 'images');
    const canvasWidth = 1024; // Size of the canvas
    const canvasHeight = 1024;

    // Load the canvas background image (canvas.png)
    const canvasBackground = await loadImage('canvas.png');

    // Read all the images in the /images/ folder
    const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.jpg'));

    for (const file of files) {
      const imgPath = path.join(inputDir, file);
      const outputPath = path.join(imagesDir, file); // Save output in /public/images/

      // Skip if the file already exists in the /public/images/ folder
      if (fs.existsSync(outputPath)) {
        console.log(`Image ${file} already exists in /public/images/, skipping.`);
        continue;
      }

      // Load the image
      const img = await loadImage(imgPath);

      // Create a canvas to manipulate the image
      const canvas = createCanvas(canvasWidth, canvasHeight);
      const ctx = canvas.getContext('2d');

      // Draw the canvas background
      ctx.drawImage(canvasBackground, 0, 0, canvasWidth, canvasHeight);

      // Scale the image to match the canvas width while maintaining the aspect ratio
      const aspectRatio = img.width / img.height;
      const newWidth = canvasWidth;
      const newHeight = newWidth / aspectRatio;
      const x = (canvasWidth - newWidth) / 2; // Center horizontally
      const y = (canvasHeight - newHeight) / 2; // Center vertically

      // Draw the image onto the canvas
      ctx.drawImage(img, x, y, newWidth, newHeight);

      // Save the final image as the same name as the original image
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(outputPath, buffer);
      console.log(`Processed and saved: ${file}`);
    }
  } catch (err) {
    console.error('Error processing images:', err);
  }
}


module.exports = {process_image}