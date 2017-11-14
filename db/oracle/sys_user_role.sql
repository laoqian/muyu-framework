-- Create table
create table SYS_USER_ROLE
(
  id      NUMBER(20),
  user_id NUMBER(20),
  role_id NUMBER(20)
)
tablespace data
  pctfree 10
  initrans 1
  maxtrans 255;
