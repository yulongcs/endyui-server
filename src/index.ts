import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import multer from "multer";

const PORT = 51111;

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public", "uploads"),
  filename(_req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (_req, res, _next) => {
  res.json({ success: true, data: "xx" });
});

app.post(
  "/user/uploadAvatar",
  upload.single("avatar"),
  (req: Request, res: Response, _next: NextFunction) => {
    let domain = "localhost";
    let avatar = `http://${domain}:${PORT}/uploads/${req.file.filename}`;
    res.send({ success: true, data: avatar });
  }
);

(async function () {
  app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
  });
})();