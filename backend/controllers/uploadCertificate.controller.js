import Certificate from "../models/certificate.model.js";

export const uploadCertificate = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Generate the URL for the uploaded thumbnail
    const certificate_url = req.file.path;
    const update = {
      certificate: certificate_url,
    };
    const certificate = await Certificate.findByIdAndUpdate(
      "66d19c1567ffb0366f3d4571",
      update,
      { new: true }
    );

    if (!certificate) {
      return res
        .status(400)
        .json({ error: "error upload certificate background" });
    }
    return res
      .status(200)
      .json({ message: "certificate uploaded successfully",certificate });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "error in uploadCertificate controller" });
  }
};

export const getCertificate=async(req,res)=>{
    try {
        const certificate = await Certificate.findById("66d19c1567ffb0366f3d4571")
        if (!certificate) {
            return res
              .status(400)
              .json({ error: "error in fetching certificate" });
          }
          return res
          .status(200)
          .json({ message: "certificate fetched successfully",certificate });

    } catch (error) {
        console.log(error.message);
        return res
          .status(500)
          .json({ error: "error in getCertificate controller" });
    }
}
