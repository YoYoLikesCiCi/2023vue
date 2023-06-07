package database

import (
	"fmt"
	"strconv"

	// "./models.go"

	"gorm.io/gorm"
)

// var url = "/Users/neo/Downloads/db.db"

func CreateRecord(data map[string]string, db *gorm.DB) string {
	b, err := strconv.Atoi(data["Value"])
	if err != nil {
		fmt.Print(err)
	}
	fmt.Print(data["Value"])
	record := Records{
		// Record_id
		Value:        b,
		Debt_ID:      2,
		Note:         data["Note"],
		From_Account: data["From_Account"],
		To_Account:   data["To_Account"],
		Record_Time:  data["Record_Time"],
	}
	fmt.Print(record)
	// return data["Value"]
	db.Create(&record)
	return "success"
	// fmt.Print(result)

}
