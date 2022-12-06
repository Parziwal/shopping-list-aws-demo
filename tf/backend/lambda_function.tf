module "list_shopping_lists_lambda" {
  source        = "../modules/archive_lambda"
  file_folder   = "${path.module}/${var.lambda_folder}"
  function_name = "list_shopping_lists"
  role          = aws_iam_role.lambda_access_to_shopping_list_tables.arn
  environment_varibles = {
    SHOPPING_LIST_TABLE = aws_dynamodb_table.shopping_list.name
  }
}

module "create_shopping_list_lambda" {
  source        = "../modules/archive_lambda"
  file_folder   = "${path.module}/${var.lambda_folder}"
  function_name = "create_shopping_list"
  role          = aws_iam_role.lambda_access_to_shopping_list_tables.arn
  environment_varibles = {
    SHOPPING_LIST_TABLE = aws_dynamodb_table.shopping_list.name
  }
}

module "delete_shopping_list_lambda" {
  source        = "../modules/archive_lambda"
  file_folder   = "${path.module}/${var.lambda_folder}"
  function_name = "delete_shopping_list"
  role          = aws_iam_role.lambda_access_to_shopping_list_tables.arn
  environment_varibles = {
    SHOPPING_LIST_TABLE      = aws_dynamodb_table.shopping_list.name,
    SHOPPING_LIST_ITEM_TABLE = aws_dynamodb_table.shopping_list_item.name
  }
}

module "add_user_to_shopping_list_lambda" {
  source        = "../modules/archive_lambda"
  file_folder   = "${path.module}/${var.lambda_folder}"
  function_name = "add_user_to_shopping_list"
  role          = aws_iam_role.lambda_access_to_shopping_list_tables.arn
  environment_varibles = {
    SHOPPING_LIST_TABLE = aws_dynamodb_table.shopping_list.name
  }
}

module "remove_user_from_shopping_list_lambda" {
  source        = "../modules/archive_lambda"
  file_folder   = "${path.module}/${var.lambda_folder}"
  function_name = "remove_user_from_shopping_list"
  role          = aws_iam_role.lambda_access_to_shopping_list_tables.arn
  environment_varibles = {
    SHOPPING_LIST_TABLE = aws_dynamodb_table.shopping_list.name
  }
}

module "list_shopping_items_lambda" {
  source        = "../modules/archive_lambda"
  file_folder   = "${path.module}/${var.lambda_folder}"
  function_name = "list_shopping_items"
  role          = aws_iam_role.lambda_access_to_shopping_list_tables.arn
  environment_varibles = {
    SHOPPING_LIST_TABLE      = aws_dynamodb_table.shopping_list.name
    SHOPPING_LIST_ITEM_TABLE = aws_dynamodb_table.shopping_list_item.name
  }
}

module "create_edit_shopping_item_lambda" {
  source        = "../modules/archive_lambda"
  file_folder   = "${path.module}/${var.lambda_folder}"
  function_name = "create_edit_shopping_item"
  role          = aws_iam_role.lambda_access_to_shopping_list_tables.arn
  environment_varibles = {
    SHOPPING_LIST_TABLE      = aws_dynamodb_table.shopping_list.name
    SHOPPING_LIST_ITEM_TABLE = aws_dynamodb_table.shopping_list_item.name
  }
}

module "delete_shopping_item_lambda" {
  source        = "../modules/archive_lambda"
  file_folder   = "${path.module}/${var.lambda_folder}"
  function_name = "delete_shopping_item"
  role          = aws_iam_role.lambda_access_to_shopping_list_tables.arn
  environment_varibles = {
    SHOPPING_LIST_TABLE      = aws_dynamodb_table.shopping_list.name
    SHOPPING_LIST_ITEM_TABLE = aws_dynamodb_table.shopping_list_item.name
  }
}