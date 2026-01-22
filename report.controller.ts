import { Request, Response } from "express"
import { prisma } from "../prisma"

export async function getReports(req: Request, res: Response) {
  const uploads = await prisma.upload.findMany()

  res.json({
    totalUploads: uploads.length,
    uploads,
  })
}
