-- Create table
create table SYS_ATTACH
(
  id          NUMBER(20) not null,
  name        VARCHAR2(200) not null,
  file_size   NUMBER(20) not null,
  save_path   VARCHAR2(200) not null,
  create_by   NVARCHAR2(64) not null,
  create_date TIMESTAMP(6) not null,
  update_by   NVARCHAR2(64) not null,
  update_date TIMESTAMP(6) not null,
  remarks     NVARCHAR2(255),
  del_flag    CHAR(1) default 0 not null,
  extension   VARCHAR2(40)
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
-- Add comments to the columns 
comment on column SYS_ATTACH.id
  is '编号';
comment on column SYS_ATTACH.name
  is '名字';
comment on column SYS_ATTACH.file_size
  is '大小';
comment on column SYS_ATTACH.save_path
  is '保存路径';
comment on column SYS_ATTACH.create_by
  is '创建者';
comment on column SYS_ATTACH.create_date
  is '创建时间';
comment on column SYS_ATTACH.update_by
  is '更新者';
comment on column SYS_ATTACH.update_date
  is '更新时间';
comment on column SYS_ATTACH.remarks
  is '备注信息';
comment on column SYS_ATTACH.del_flag
  is '删除标记';
comment on column SYS_ATTACH.extension
  is '扩展信息';
