module "list_shopping_items_lambda" {
  source        = "../modules/archive_lambda"
  file_folder   = "${path.module}/../../lambdas"
  function_name = "list_shopping_items"
  role          = aws_iam_role.lambda.arn
  environment_varibles = {
    SHOPPING_LIST_TABLE = aws_dynamodb_table.shopping_list.name
  }
}

module "create_edit_shopping_item_lambda" {
  source        = "../modules/archive_lambda"
  file_folder   = "${path.module}/../../lambdas"
  function_name = "create_edit_shopping_item"
  role          = aws_iam_role.lambda.arn
  environment_varibles = {
    SHOPPING_LIST_TABLE = aws_dynamodb_table.shopping_list.name
  }
}

module "delete_shopping_item_lambda" {
  source        = "../modules/archive_lambda"
  file_folder   = "${path.module}/../../lambdas"
  function_name = "delete_shopping_item"
  role          = aws_iam_role.lambda.arn
  environment_varibles = {
    SHOPPING_LIST_TABLE = aws_dynamodb_table.shopping_list.name
  }
}