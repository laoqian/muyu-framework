-- Create table
create table SYS_NOTIFY_RECORD
(
  id        VARCHAR2(64) not null,
  notify_id VARCHAR2(64),
  user_id   VARCHAR2(64),
  read_flag CHAR(1) default '0',
  read_date DATE
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
comment on column SYS_NOTIFY_RECORD.id
  is '���';
comment on column SYS_NOTIFY_RECORD.notify_id
  is '֪ͨͨ��ID';
comment on column SYS_NOTIFY_RECORD.user_id
  is '������';
comment on column SYS_NOTIFY_RECORD.read_flag
  is '�Ķ����';
comment on column SYS_NOTIFY_RECORD.read_date
  is '�Ķ�ʱ��';
