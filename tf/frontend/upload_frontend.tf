data "aws_api_gateway_rest_api" "this" {
  name = "shopping_list_api"
}

resource "local_file" "environment_config" {
  content = templatefile("${path.module}/../../frontend/src/environments/environment.template.ts", {
    apiUrl     = "https://${data.aws_api_gateway_rest_api.this.id}.execute-api.${var.region}.amazonaws.com/prod",
    cognitoUrl = "https://cognito-idp.${var.region}.amazonaws.com/${tolist(data.aws_cognito_user_pools.this.ids)[0]}",
    clientId   = aws_cognito_user_pool_client.prod_client.id,
    clientUrl  = "https://${aws_cloudfront_distribution.this.domain_name}",
    }
  )
  filename = "${path.module}/../../frontend/src/environments/environment.prod.ts"
}

resource "null_resource" "compile_frontend" {
  triggers = {
    build_number = timestamp()
  }

  provisioner "local-exec" {
    command = "npm ci --prefix ${path.module}/../../frontend && npm run build --prefix ${path.module}/../../frontend"
  }

  depends_on = [
    local_file.environment_config
  ]
}

resource "aws_s3_object" "html" {
  for_each = fileset("${path.module}/../../frontend/dist/shopping_list/", "**/*.html")

  bucket = "shopping-list-frontend-bucket"
  key    = each.value
  source = "${path.module}/../../frontend/dist/shopping_list/${each.value}"
  etag   = filemd5("${path.module}/../../frontend/dist/shopping_list/${each.value}")
  content_type = "text/html"
  depends_on = [
    null_resource.compile_frontend
  ]
}

resource "aws_s3_object" "css" {
  for_each = fileset("${path.module}/../../frontend/dist/shopping_list/", "**/*.css")

  bucket = "shopping-list-frontend-bucket"
  key    = each.value
  source = "${path.module}/../../frontend/dist/shopping_list/${each.value}"
  etag   = filemd5("${path.module}/../../frontend/dist/shopping_list/${each.value}")
  content_type = "text/css"
  depends_on = [
    null_resource.compile_frontend
  ]
}

resource "aws_s3_object" "js" {
  for_each = fileset("${path.module}/../../frontend/dist/shopping_list/", "**/*.js")

  bucket = "shopping-list-frontend-bucket"
  key    = each.value
  source = "${path.module}/../../frontend/dist/shopping_list/${each.value}"
  etag   = filemd5("${path.module}/../../frontend/dist/shopping_list/${each.value}")
  content_type = "application/javascript"
  depends_on = [
    null_resource.compile_frontend
  ]
}

resource "aws_s3_object" "png" {
  for_each = fileset("${path.module}/../../frontend/dist/shopping_list/", "**/*.png")

  bucket = "shopping-list-frontend-bucket"
  key    = each.value
  source = "${path.module}/../../frontend/dist/shopping_list/${each.value}"
  etag   = filemd5("${path.module}/../../frontend/dist/shopping_list/${each.value}")
  content_type = "image/png"
  depends_on = [
    null_resource.compile_frontend
  ]
}

resource "aws_s3_object" "svg" {
  for_each = fileset("${path.module}/../../frontend/dist/shopping_list/", "**/*.svg")

  bucket = "shopping-list-frontend-bucket"
  key    = each.value
  source = "${path.module}/../../frontend/dist/shopping_list/${each.value}"
  etag   = filemd5("${path.module}/../../frontend/dist/shopping_list/${each.value}")
  content_type = "image/svg+xml"
  depends_on = [
    null_resource.compile_frontend
  ]
}

resource "aws_s3_object" "txt" {
  for_each = fileset("${path.module}/../../frontend/dist/shopping_list/", "**/*.txt")

  bucket = "shopping-list-frontend-bucket"
  key    = each.value
  source = "${path.module}/../../frontend/dist/shopping_list/${each.value}"
  etag   = filemd5("${path.module}/../../frontend/dist/shopping_list/${each.value}")
  content_type = "text/plain"
  depends_on = [
    null_resource.compile_frontend
  ]
}

