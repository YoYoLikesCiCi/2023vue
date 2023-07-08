package main

import (
	"fmt"
	"gomo/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1.创建路由
	r := gin.Default()
	// 2.绑定路由规则，执行的函数
	// gin.Context，封装了request和response

	r.Use(Cors())
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "hello World!")
	})
	var db = database.OpenDB()
	r.POST("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	// 3.监听端口，默认在8080
	// Run("里面不指定端口号默认为8080")
	r.POST(("/fetch"), func(ctx *gin.Context) {
		var result = database.ReadRecords("select * from Records order by record_time desc", db)
		ctx.JSON(http.StatusOK, result)
		// ctx.XML(http.StatusOK, gin.H{
		// 	"record": result,
		// })
	})

	r.POST(("/fetchAll"), func(ctx *gin.Context) {
		sql := ctx.PostForm("sql")
		// ctx.Request.ParseForm()
		// database.OriginWrite(sql, db)
		// database.OriginWrite("insert into Records (value, from_account, to_account, record_Time, note ) values(838, \"农行国家宝藏\", \"食材\", \"2023-06-06 13:11:11\", \"烧卖\")", db)
		var result = database.ReadRecords("select * from Records order by record_time desc", db)
		fmt.Print(sql)
		fmt.Printf("haha")
		ctx.JSON(http.StatusOK, result)

	})
	r.POST(("/CreateRecord"), func(ctx *gin.Context) {

		var json = make(map[string]string)
		json["Value"] = ctx.PostForm("Value")
		json["Record_Time"] = ctx.PostForm("Record_Time")
		json["From_Account"] = ctx.PostForm("From_Account")
		json["To_Account"] = ctx.PostForm("To_Account")
		json["Note"] = ctx.PostForm("Note")
		result := database.CreateRecord(json, db)
		fmt.Print(result)
		ctx.JSON(http.StatusOK, json)

	})

	r.POST(("/DeleteRecordByID"), func(ctx *gin.Context) {

		var json = make(map[string]string)
		json["Record_id"] = ctx.PostForm("Record_id")
		var id = json["Record_id"]
		result := database.DeleteRecordByID(id, db)
		fmt.Print(result)
		ctx.JSON(http.StatusOK, id)

	})

	//查询账户余额
	r.POST(("/ReadAccountValue"), func(ctx *gin.Context) {

		result := database.ReadAccountValue(db)
		fmt.Print(result)
		ctx.JSON(http.StatusOK,result)

	})
	// var result = database.ReadRecords("select * from Records", db)
	// fmt.Print(db)

	// db.First(&result)
	// fmt.Println(result)
	// fmt.Println(result.Value)
	// fmt.Println(result.From_Account)
	// fmt.Println(result.To_Account)
	// fmt.Println(result.Record_Time)
	// fmt.Println(result.Note)
	// fmt.Println(result.Debt_ID)

	r.Run(":18000")
}

func Run(s string) {
	panic("unimplemented")
}

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin")
		if origin != "" {
			c.Header("Access-Control-Allow-Origin", "*") // 可将将 * 替换为指定的域名
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
			c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
			c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language, Content-Type")
			c.Header("Access-Control-Allow-Credentials", "true")
		}
		if method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		c.Next()
	}
}
