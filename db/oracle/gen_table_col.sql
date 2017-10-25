-- Create table
create table GEN_TABLE_COLUMN
(
  id           VARCHAR2(64) not null,
  gen_table_id VARCHAR2(64),
  name         NVARCHAR2(200),
  comments     NVARCHAR2(500),
  jdbc_type    VARCHAR2(100),
  java_type    VARCHAR2(500),
  java_field   VARCHAR2(200),
  is_pk        CHAR(1),
  is_null      CHAR(1),
  is_insert    CHAR(1),
  is_edit      CHAR(1),
  is_list      CHAR(1),
  is_query     CHAR(1),
  query_type   VARCHAR2(200),
  show_type    VARCHAR2(200),
  dict_type    VARCHAR2(200),
  settings     NVARCHAR2(2000),
  sort         NUMBER,
  create_by    VARCHAR2(64),
  create_date  TIMESTAMP(6),
  update_by    VARCHAR2(64),
  update_date  TIMESTAMP(6),
  remarks      NVARCHAR2(255),
  del_flag     CHAR(1) default '0' not null
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
comment on table GEN_TABLE_COLUMN
  is 'ҵ����ֶ�';
-- Add comments to the columns 
comment on column GEN_TABLE_COLUMN.id
  is '���';
comment on column GEN_TABLE_COLUMN.gen_table_id
  is '��������';
comment on column GEN_TABLE_COLUMN.name
  is '����';
comment on column GEN_TABLE_COLUMN.comments
  is '����';
comment on column GEN_TABLE_COLUMN.jdbc_type
  is '�е��������͵��ֽڳ���';
comment on column GEN_TABLE_COLUMN.java_type
  is 'JAVA����';
comment on column GEN_TABLE_COLUMN.java_field
  is 'JAVA�ֶ���';
comment on column GEN_TABLE_COLUMN.is_pk
  is '�Ƿ�����';
comment on column GEN_TABLE_COLUMN.is_null
  is '�Ƿ��Ϊ��';
comment on column GEN_TABLE_COLUMN.is_insert
  is '�Ƿ�Ϊ�����ֶ�';
comment on column GEN_TABLE_COLUMN.is_edit
  is '�Ƿ�༭�ֶ�';
comment on column GEN_TABLE_COLUMN.is_list
  is '�Ƿ��б��ֶ�';
comment on column GEN_TABLE_COLUMN.is_query
  is '�Ƿ��ѯ�ֶ�';
comment on column GEN_TABLE_COLUMN.query_type
  is '��ѯ��ʽ�����ڡ������ڡ����ڡ�С�ڡ���Χ����LIKE����LIKE������LIKE��';
comment on column GEN_TABLE_COLUMN.show_type
  is '�ֶ����ɷ������ı����ı��������򡢸�ѡ�򡢵�ѡ���ֵ�ѡ����Աѡ�񡢲���ѡ������ѡ��';
comment on column GEN_TABLE_COLUMN.dict_type
  is '�ֵ�����';
comment on column GEN_TABLE_COLUMN.settings
  is '�������ã���չ�ֶ�JSON��';
comment on column GEN_TABLE_COLUMN.sort
  is '��������';
comment on column GEN_TABLE_COLUMN.create_by
  is '������';
comment on column GEN_TABLE_COLUMN.create_date
  is '����ʱ��';
comment on column GEN_TABLE_COLUMN.update_by
  is '������';
comment on column GEN_TABLE_COLUMN.update_date
  is '����ʱ��';
comment on column GEN_TABLE_COLUMN.remarks
  is '��ע��Ϣ';
comment on column GEN_TABLE_COLUMN.del_flag
  is 'ɾ����ǣ�0��������1��ɾ����';
-- Create/Recreate indexes 
create index GEN_TABLE_COLUMN_DEL_FLAG on GEN_TABLE_COLUMN (DEL_FLAG)
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
create index GEN_TABLE_COLUMN_NAME on GEN_TABLE_COLUMN (NAME)
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
create index GEN_TABLE_COLUMN_SORT on GEN_TABLE_COLUMN (SORT)
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
create index GEN_TABLE_COLUMN_TABLE_ID on GEN_TABLE_COLUMN (GEN_TABLE_ID)
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
alter table GEN_TABLE_COLUMN
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
