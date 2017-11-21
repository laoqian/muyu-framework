-- Create table
create table GEN_TABLE
(
  id              VARCHAR2(64) not null,
  name            NVARCHAR2(200),
  comments        NVARCHAR2(500),
  class_name      VARCHAR2(100),
  parent_table    VARCHAR2(200),
  parent_table_fk VARCHAR2(100),
  create_by       VARCHAR2(64),
  create_date     TIMESTAMP(6),
  update_by       VARCHAR2(64),
  update_date     TIMESTAMP(6),
  remarks         NVARCHAR2(255),
  del_flag        CHAR(1) default '0' not null
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table GEN_TABLE
  is '业务表';
-- Add comments to the columns 
comment on column GEN_TABLE.id
  is '编号';
comment on column GEN_TABLE.name
  is '名称';
comment on column GEN_TABLE.comments
  is '描述';
comment on column GEN_TABLE.class_name
  is '实体类名称';
comment on column GEN_TABLE.parent_table
  is '关联父表';
comment on column GEN_TABLE.parent_table_fk
  is '关联父表外键';
comment on column GEN_TABLE.create_by
  is '创建者';
comment on column GEN_TABLE.create_date
  is '创建时间';
comment on column GEN_TABLE.update_by
  is '更新者';
comment on column GEN_TABLE.update_date
  is '更新时间';
comment on column GEN_TABLE.remarks
  is '备注信息';
comment on column GEN_TABLE.del_flag
  is '删除标记（0：正常；1：删除）';
-- Create/Recreate indexes 
create index GEN_TABLE_DEL_FLAG on GEN_TABLE (DEL_FLAG)
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
create index GEN_TABLE_NAME on GEN_TABLE (NAME)
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Create/Recreate primary, unique and foreign key constraints 
alter table GEN_TABLE
  add primary key (ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
