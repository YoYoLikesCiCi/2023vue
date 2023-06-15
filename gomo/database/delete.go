package database

import (

	// "./models.go"

	"gorm.io/gorm"
)

// var url = "/Users/neo/Downloads/db.db"

func DeleteRecordByID(id string, db *gorm.DB) string {

	// db.Where("Record_id = ?", id).Delete(&Records{})
	db.Delete(&Records{}, id)
	return "success"
	// fmt.Print(result)

}
