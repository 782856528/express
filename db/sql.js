const sql={
    inhert:"select * from mysql.wml limit ?,?",
    add:"insert into mysql.wml (name,age,sex,file) values (?,?,?,?)",
    upload:"insert into mysql.upload (file) values (?)",
    delete:"delete from  mysql.wml where id=?",
    login:"select* from mysql.userlist where account=? and password=?",
    register:"insert into mysql.userlist (account,password) values (?,?)",
    updata:"update mysql.wml set name=?,sex=?,age=?,file=? where id=?"
}
module.exports=sql