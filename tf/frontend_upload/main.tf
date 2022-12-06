locals {
  mime_type_mappings = {
    html = "text/html",
    js   = "text/javascript",
    css  = "text/css",
    png  = "image/png",
    svg  = "image/svg+xml",
    txt  = "text/plain",
  }
}

resource "aws_s3_object" "frontend" {
  for_each = fileset("${path.module}/${var.frontend_build_folder}", "**")

  bucket       = var.bucket_name
  key          = each.key
  source       = "${path.module}/${var.frontend_build_folder}/${each.key}"
  source_hash  = filemd5("${path.module}/${var.frontend_build_folder}/${each.key}")
  content_type = lookup(local.mime_type_mappings, concat(regexall("\\.([^\\.]*)$", each.key), [[""]])[0][0], "application/octet-stream")
}