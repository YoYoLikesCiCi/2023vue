package database

type Records struct {
	Record_id    int `gorm:"primaryKey";"AUTO_INCREMENT"`
	Value        int
	Debt_ID      int
	Note         string
	From_Account string `gorm:"column:from_Account"`
	To_Account   string `gorm:"column:to_Account"`
	Record_Time  string `gorm:"column:record_Time"`
}
