data "archive_file" "this" {
  source_file = "${var.file_folder}/${var.function_name}.js"
  output_path = "${var.file_folder}/archive/${var.function_name}.zip"
  type        = "zip"
}

resource "aws_lambda_function" "this" {
  filename         = data.archive_file.this.output_path
  function_name    = var.function_name
  role             = var.role
  handler          = "${var.function_name}.handler"
  source_code_hash = filebase64sha256(data.archive_file.this.output_path)

  runtime = "nodejs16.x"

  environment {
    variables = var.environment_varibles
  }
}