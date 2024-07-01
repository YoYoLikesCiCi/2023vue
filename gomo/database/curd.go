package database

import (
	"fmt"
	// "gomo/database"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var urlonmac = "/Users/neo/Downloads/db.db"
var urlonwin = "/mnt/d/db.db"
var urloniCloud = "/Users/neo/Library/Mobile Documents/com~apple~CloudDocs/db.db"
var url = "/Users/neo/Library/Mobile Documents/com~apple~CloudDocs/db.db"

func OpenDB() (db *gorm.DB) {
	fmt.Printf("no error")
	db, err := gorm.Open(sqlite.Open(url), &gorm.Config{})
	fmt.Printf("success")
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Printf("to return")
	return db
}

// 读取所有记录
func ReadRecords(sql string, db *gorm.DB) (result []Records) {
	var temp Records
	db.First(&temp)
	// fmt.Println(temp)
	db.Raw(sql).Scan(&result)
	return result
}

// 根据账户查询余额
func ReadAccountValue(db *gorm.DB) map[string]int {
	var resultFrom, resultTo []AccountValue
	mapFrom := make(map[string]int)
	mapTo := make(map[string]int)
	mapResult := make(map[string]int)
	// mapResult2 := make(map[string]int)
	var accounts []AccountName
	// var accounts []Accounts
	// var mapFrom, mapTo, mapResult map[string]int

	db.Model(&Records{}).Select("from_account as Account_Name, sum(value) as Account_Value").Group("From_Account").Find(&resultFrom)

	db.Model(&Records{}).Select("to_account as Account_Name, sum(value) as Account_Value").Group("To_Account").Find(&resultTo)

	db.Model(&Accounts{}).Select("account_Name as Account_Name").Where("type = ?", "3").Find(&accounts)

	fmt.Print(accounts)

	//转map
	for _, v := range accounts {
		mapResult[v.Account_Name] = 0
	}

	for _, v := range resultFrom {
		mapFrom[v.Account_Name] = v.Account_Value
	}

	// 写入到account，筛选过程
	for _, v := range resultTo {
		mapTo[v.Account_Name] = v.Account_Value
		_, ok2 := mapResult[v.Account_Name]

		if ok2 {
			fmt.Println("wow")
			value, ok := mapFrom[v.Account_Name]
			if ok {
				mapResult[v.Account_Name] = (v.Account_Value - value) / 100
				// delete(mapFrom,v.Account_Name)
			} else {
				mapResult[v.Account_Name] = v.Account_Value / 100
			}
		}

	}
	// for k,v := range mapFrom{
	// 	mapResult[k] = - v/100
	// }

	// for k,v := range mapResult{
	// 	value , ok := map
	// }

	// fmt.Print(accounts[0])
	fmt.Printf("after 999 accounts")
	fmt.Print(mapResult)

	return mapResult
}

// 根据第二类型查询（当月）
func ReadTypeValueOfCurrentMonth(db *gorm.DB, year int, month int) map[string]int {
	var resultFrom, resultTo []AccountValue
	mapFrom := make(map[string]int)
	mapTo := make(map[string]int)

	mapResult := make(map[string]int)
	// mapResult2 := make(map[string]int)
	var expertAccounts, incomeAccounts []AccountName
	// var accounts []Accounts
	// var mapFrom, mapTo, mapResult map[string]int

	db.Model(&Records{}).Select("from_account as Account_Name, sum(value) as Account_Value").Group("From_Account").Find(&resultFrom)
	db.Model(&Accounts{}).Select("account_Name as Account_Name").Where("type = ?", "1").Find(&incomeAccounts)

	db.Model(&Records{}).Select("to_account as Account_Name, sum(value) as Account_Value").Group("To_Account").Find(&resultTo)
	db.Model(&Accounts{}).Select("account_Name as Account_Name").Where("type = ?", "0").Find(&expertAccounts)

	fmt.Print(expertAccounts)

	//转map
	for _, v := range expertAccounts {
		mapResult[v.Account_Name] = 0
	}

	for _, v := range resultFrom {
		mapFrom[v.Account_Name] = v.Account_Value
	}

	// 写入到account，筛选过程
	for _, v := range resultTo {
		mapTo[v.Account_Name] = v.Account_Value
		_, ok2 := mapResult[v.Account_Name]

		if ok2 {
			fmt.Println("wow")
			value, ok := mapFrom[v.Account_Name]
			if ok {
				mapResult[v.Account_Name] = (v.Account_Value - value) / 100
				// delete(mapFrom,v.Account_Name)
			} else {
				mapResult[v.Account_Name] = v.Account_Value / 100
			}
		}

	}
	// for k,v := range mapFrom{
	// 	mapResult[k] = - v/100
	// }

	// for k,v := range mapResult{
	// 	value , ok := map
	// }

	// fmt.Print(accounts[0])
	fmt.Printf("after 999 accounts")
	fmt.Print(mapResult)

	return mapResult
}
func OriginWrite(sql string, db *gorm.DB) {
	db.Exec(sql)
}

//

// 原生查询

// type Result struct {
// 	ID   int
// 	Name string
// 	Age  int
//   }

//   var result Result
//   db.Raw("SELECT id, name, age FROM users WHERE id = ?", 3).Scan(&result)

//   db.Raw("SELECT id, name, age FROM users WHERE name = ?", "jinzhu").Scan(&result)

//   var age int
//   db.Raw("SELECT SUM(age) FROM users WHERE role = ?", "admin").Scan(&age)

//   var users []User
//   db.Raw("UPDATE users SET name = ? WHERE age = ? RETURNING id, name", "jinzhu", 20).Scan(&users)

//原生sql

//   db.Exec("DROP TABLE users")
// db.Exec("UPDATE orders SET shipped_at = ? WHERE id IN ?", time.Now(), []int64{1, 2, 3})

// // Exec with SQL Expression
// db.Exec("UPDATE users SET money = ? WHERE name = ?", gorm.Expr("money * ? + ?", 10000, 1), "jinzhu")

// func main() {
// 	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
// 	if err != nil {
// 		panic("failed to connect database")
// 	}

// 	// 迁移 schema
// 	db.AutoMigrate(&Records{})

// 	// Create
// 	db.Create(&Records{Code: "D42", Price: 100})

// 	// Read
// 	var product Records
// 	db.First(&product, 1)                 // 根据整型主键查找
// 	db.First(&product, "code = ?", "D42") // 查找 code 字段值为 D42 的记录

// 	// Update - 将 product 的 price 更新为 200
// 	db.Model(&product).Update("Price", 200)
// 	// Update - 更新多个字段
// 	db.Model(&product).Updates(Product{Price: 200, Code: "F42"}) // 仅更新非零值字段
// 	db.Model(&product).Updates(map[string]interface{}{"Price": 200, "Code": "F42"})

// 	// Delete - 删除 product
// 	db.Delete(&product, 1)
// }
