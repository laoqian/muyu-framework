-- Create table
create table SYS_ROLE_MENU
(
  id      NUMBER(20),
  role_id NUMBER(20),
  menu_id NUMBER(20)
)
tablespace DATA
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
