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
  is '���';
comment on column SYS_ATTACH.name
  is '����';
comment on column SYS_ATTACH.file_size
  is '��С';
comment on column SYS_ATTACH.save_path
  is '����·��';
comment on column SYS_ATTACH.create_by
  is '������';
comment on column SYS_ATTACH.create_date
  is '����ʱ��';
comment on column SYS_ATTACH.update_by
  is '������';
comment on column SYS_ATTACH.update_date
  is '����ʱ��';
comment on column SYS_ATTACH.remarks
  is '��ע��Ϣ';
comment on column SYS_ATTACH.del_flag
  is 'ɾ�����';
comment on column SYS_ATTACH.extension
  is '��չ��Ϣ';
