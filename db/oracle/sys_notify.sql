-- Create table
create table SYS_NOTIFY
(
  id            NUMBER(20) not null,
  title         VARCHAR2(200) not null,
  type          CHAR(1) not null,
  content       CLOB not null,
  user_id       NUMBER(20),
  status        CHAR(1),
  create_by     NVARCHAR2(64) not null,
  create_date   TIMESTAMP(6) not null,
  update_by     NVARCHAR2(64) not null,
  update_date   TIMESTAMP(6) not null,
  remarks       NVARCHAR2(255),
  del_flag      CHAR(1) default '0' not null,
  browse_volume NUMBER(10) default 0
)
tablespace DATA
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
-- Add comments to the columns 
comment on column SYS_NOTIFY.id
  is '���';
comment on column SYS_NOTIFY.title
  is '����';
comment on column SYS_NOTIFY.type
  is '����';
comment on column SYS_NOTIFY.content
  is '����';
comment on column SYS_NOTIFY.user_id
  is '�û�Id';
comment on column SYS_NOTIFY.status
  is '״̬';
comment on column SYS_NOTIFY.create_by
  is '������';
comment on column SYS_NOTIFY.create_date
  is '����ʱ��';
comment on column SYS_NOTIFY.update_by
  is '������';
comment on column SYS_NOTIFY.update_date
  is '����ʱ��';
comment on column SYS_NOTIFY.remarks
  is '��ע��Ϣ';
comment on column SYS_NOTIFY.del_flag
  is 'ɾ�����';
comment on column SYS_NOTIFY.browse_volume
  is '�����';
