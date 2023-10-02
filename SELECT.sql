SELECT
	from1.to_Account as '账户',(from1.sumfrom)/100 as '余额'
FROM
	( SELECT to_Account,SUM( value ) AS sumfrom FROM Records where record_Time > '2023-08-01 00:00:00' GROUP BY to_Account  ) AS from1 ,
	(select account_Name AS incomename FROM Accounts where type = '0') AS form2
WHERE from1.to_Account = form2.incomename ORDER BY from1.sumfrom DESC


SELECT strftime('%Y-%m', datetime(record_Time)) AS month,
       COUNT(*) AS count
FROM Records
GROUP BY month
ORDER BY month;


select * from Records WHERE from_Account = '工资收入' or to_Account = '工资收入' order by record_Time DESC


（包含账户）
SELECT strftime('%Y-%m', datetime(record_Time)) AS month,
       to_account,
       SUM(value/100) AS total_expenses
FROM records
GROUP BY month, to_account
ORDER BY month, to_account;

-- 一年的支出按月
SELECT strftime('%Y-%m', datetime(record_Time)) AS month,
       SUM(value/100) AS total_expenses
FROM records,
(select account_Name AS incomename FROM Accounts where type = '0') AS form2
WHERE records.to_account = form2.incomename
GROUP BY month
ORDER BY month ASC;


-- 当月支出分类
SELECT strftime('%Y-%m', datetime(record_Time)) AS month, records.to_account, 
       SUM(value/100) AS total_expenses
FROM records,
(select account_Name AS incomename FROM Accounts where type = '0') AS form2
WHERE records.to_account = form2.incomename
And month = '2023-09' 
GROUP BY records.to_account
Order by total_expenses desc;


-- 当月收入分类

SELECT strftime('%Y-%m', datetime(record_Time)) AS month, records.from_account, 
       SUM(value/100) AS total_expenses
FROM records,
(select account_Name AS incomename FROM Accounts where type = '1') AS form2
WHERE records.from_account = form2.incomename
And month = '2023-09' 
GROUP BY records.from_account
Order by total_expenses desc;


年总支出
SELECT strftime('%Y', datetime(record_Time)) AS year,
       SUM(value/100) AS total_expenses
FROM records,
(select account_Name AS incomename FROM Accounts where type = '0') AS form2
WHERE records.to_account = form2.incomename
GROUP BY year
ORDER BY total_expenses DESC;

//不同支出种类按年
SELECT strftime('%Y', datetime(record_Time)) AS year,
       to_account,
       SUM(value/100) AS total_expenses
FROM records,
(select account_Name AS incomename FROM Accounts where type = '0') AS form2
WHERE year='2023' AND records.to_account = form2.incomename
GROUP BY  to_account
ORDER BY total_expenses DESC;

-- 不同收入种类按年

SELECT strftime('%Y', datetime(record_Time)) AS year,
       from_account,
       SUM(value/100) AS total_expenses
FROM records,
(select account_Name AS incomename FROM Accounts where type = '1') AS form2
WHERE year='2023' AND records.from_account = form2.incomename
GROUP BY  from_account
ORDER BY total_expenses DESC;



SELECT
	sum(from1.sumfrom)/100 as '余额'
FROM
	( SELECT to_Account,SUM( value ) AS sumfrom , strftime('%Y-%m', datetime(record_Time)) AS month, FROM Records where record_Time > '2023-08-01 00:00:00' GROUP BY to_Account, record  ) AS from1 ,
	(select account_Name AS incomename FROM Accounts where type = '0') AS form2
WHERE from1.to_Account = form2.incomename ORDER BY from1.sumfrom DESC


//查单一项目详情一年

SELECT strftime('%Y', datetime(record_Time)) AS year,
       note,
       value 
FROM records
WHERE year='2023' AND  to_account='食材'
ORDER BY value DESC;
