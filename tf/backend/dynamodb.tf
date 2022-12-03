resource "aws_dynamodb_table" "shopping_list" {
  name           = "ShoppingList"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "id"

  attribute {
    name = "id"
    type = "N"
  }
}

resource "aws_dynamodb_table" "shopping_list_item" {
  name           = "ShoppingListItem"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "listId"
  range_key      = "id"

  attribute {
    name = "id"
    type = "N"
  }

  attribute {
    name = "listId"
    type = "N"
  }
}