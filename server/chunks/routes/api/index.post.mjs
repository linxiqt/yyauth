import { c as defineEventHandler, v as verifyToken, g as getDb } from '../../_/nitro.mjs';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jws';
import 'ms';
import 'semver';
import 'crypto';
import 'knex';
import 'axios';
import 'ar-aes';

const index_post = defineEventHandler(async (event) => {
  try {
    const user = await verifyToken(event);
    if (!user) {
      return {
        code: 401,
        message: "\u672A\u6388\u6743\u8BBF\u95EE"
      };
    }
    const uploadDir = path.join(process.cwd(), "public", "uploads", "apps");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      multiples: false
    });
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields2, files2) => {
        if (err) return reject(err);
        resolve({ fields: fields2, files: files2 });
      });
    });
    const name = fields.name && fields.name[0];
    const description = fields.description && fields.description[0];
    if (!name || name.trim() === "") {
      if (files.icon && files.icon[0] && files.icon[0].filepath) {
        fs.unlinkSync(files.icon[0].filepath);
      }
      return {
        code: 400,
        message: "\u5E94\u7528\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"
      };
    }
    let iconPath = null;
    if (files.icon && files.icon[0] && files.icon[0].filepath) {
      const iconFile = files.icon[0];
      const fileExt = path.extname(iconFile.originalFilename);
      const newFileName = `${v4()}${fileExt}`;
      const newFilePath = path.join(uploadDir, newFileName);
      fs.renameSync(iconFile.filepath, newFilePath);
      iconPath = `/uploads/apps/${newFileName}`;
    }
    const db = await getDb();
    const query = `
      INSERT INTO apps (user_id, name, description, icon, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    const [result] = await db("apps").insert({
      user_id: user.id,
      name: name.trim(),
      description: description || null,
      icon: iconPath
    });
    return {
      code: 200,
      message: "\u5E94\u7528\u521B\u5EFA\u6210\u529F",
      data: {
        id: result.insertId,
        name: name.trim(),
        description: description || null,
        icon: iconPath
      }
    };
  } catch (error) {
    console.error("\u521B\u5EFA\u5E94\u7528\u51FA\u9519:", error);
    return {
      code: 500,
      message: "\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"
    };
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
