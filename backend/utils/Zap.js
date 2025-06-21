import axios from "axios";

const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/xxxx/yyyy"; // your Zapier webhook

export const sendProductToZapier = async (product) => {
  try {
    console.log(product);

    await axios.post(ZAPIER_WEBHOOK_URL, {
      title: product.name,
      description: product.description,
      image: product.images[0]?.url, // Must be PUBLIC image URL
      price: product.price, // Should be a public image URL
    });
    console.log("updated");
  } catch (error) {
    console.error("Zapier webhook failed", error.message);
  }
};
