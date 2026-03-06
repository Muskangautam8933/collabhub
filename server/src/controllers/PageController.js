import * as pageMetaRepo from "../repos/PageMetaRepo.js";
import * as pageRepo from "../repos/PageRepo.js";
import { withTransaction } from "../utils/withTransaction.js";

export const create = async (req, res) => {
  let page, meta;

  await withTransaction(async (session) => {
    const currentUserId = req.user.userId;
    const projectId = req.params.projectId;
    const metaPayload = req.body.meta;
    const pagePayload = req.body.page;

    if (!projectId) throw new Error("req.params.projectId is required");
    if (!metaPayload) throw new Error("req.body.meta is required");
    if (!pagePayload) throw new Error("req.body.page is required");

    if (metaPayload.clientId !== pagePayload.clientId)
      throw new Error("clientId mismatch");

    page = await pageRepo.create(
      { ...pagePayload },
      { session },
    );

    meta = await pageMetaRepo.create(
      {
        ...metaPayload,
        creator: currentUserId,
        project: projectId,
        page: page._id,
      },
      { session },
    );

    
  });

  return res.status(201).json({ page, meta });
};

export const getPageByMeta = async (req, res, next) => {
  const meta = req.query.meta;

  if (!meta) return next();

  const metaDoc = await pageMetaRepo.getById(meta);
  const page = await pageRepo.getById(metaDoc.page);

  return res.json(page);
};

export const getPagesMetaByProjectId = async (req, res) => {
  const pagesMeta = await pageMetaRepo.getByProjectId(req.params.projectId);
  return res.json(pagesMeta);
};

export const updateById = async (req, res) => {
  const page = await pageRepo.updateById(req.params.id, req.body);
  return res.json(page);
};

export const deletePage = async (req, res) => {
  await withTransaction(async (session) => {
    const page = await pageRepo.getById(req.params.id, { session });

    if (!page) throw new Error("Page not found");

    await pageRepo.softDeleteById(page._id, req.user.userId, {
      session,
    });

    await pageMetaRepo.softDeleteById(page.meta, req.user.userId, { session });
  });

  return res.json({ message: "Page deleted successfully" });
};
