package database

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var url = "/Users/neo/Downloads/db.db"

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
func ReadRecords(sql string, db *gorm.DB) (result []Records) {
	var temp Records
	db.First(&temp)
	fmt.Println(temp)
	db.Raw(sql).Scan(&result)
	return result
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
