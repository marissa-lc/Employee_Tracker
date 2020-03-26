USE EMPLYEE_DB;

INSERT INTO DEPARTMENT (NAME)
VALUES ("manager"), ("sales"), ("warehouse"), ("accounting");

INSERT INTO ROLE (TITLE, SALARY, DEPARTMEMT_ID)
VALUES ("manager", 30000, 1), ("sales", 25000, 2), ("warehouse", 24000, 3), ("accounting", 24500, 4);

INSERT INTO EMPLOYEE (FIRST_NAME, LAST_NAME, ROLE_ID, MANAGER_ID)
VALUES ("MICHEAL", "SCOTT", 1, 0), ("PAMELA", "HALPERT", 2, 1), ("DARREL", "PHILBIN", 3, 3), ("ANGELA", "MARTIN", 4, 1);

