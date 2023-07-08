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

type Accounts struct{
	Account_Name string `gorm:"primaryKey;column:account_Name"`
	Ledger_Name string `gorm:"column:ledger_Name"`
	Credit_Amount int
	Balance int
	FirstTypeName string `gorm:"column:first_Type_name"`
	// type 0 支出，1 收入。3账户
	Type int
	Type2 string 
}

type FirstTypes struct{
	FirstTypeName string 
	TypeOf string
}

type Ledgers struct{
	LedgerName string
}


// 为查询账户余额以及类型总额使用
type AccountValue struct{
	Account_Name string
	Account_Value int
}

// 为单独的账户使用
type AccountName struct{
	Account_Name string 
}