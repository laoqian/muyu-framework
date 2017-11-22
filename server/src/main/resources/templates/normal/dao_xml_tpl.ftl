<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="${packageName+".dao."+daoName}">

    <sql id="${entityName+"Columns"}">
    <#list list as column>
        ${"a."+column["name"]} AS "${column["javaField"]}" <#if column_has_next>,</#if>
    </#list>
    </sql>

    <sql id="${entityName+"Joins"}">
    </sql>

    <select id="get" resultType="${entityName}">
        SELECT
        <include refid="${entityName+"Columns"}"/>
        FROM ${tableName} a
        <include refid="${entityName+"Joins"}"/>
        WHERE a.id = ${r'#{id}'}
    </select>

    <select id="query" resultType="${entityName}">
        SELECT
        <include refid="${entityName+"Columns"}"/>
        FROM ${tableName} a
        <include refid="${entityName+"Joins"}"/>
        WHERE a.id = ${r'#{id}'}
    </select>

    <select id="findList" resultType="${entityName}">
        SELECT
        <include refid="${entityName+"Columns"}"/>
        FROM ${tableName} a
        <include refid="${entityName+"Joins"}"/>
        <where>
        </where>
        <choose>
            <when test="page !=null and page.orderBy != null and page.orderBy != ''">
                ORDER BY ${r'${page.orderBy}'}
            </when>
            <otherwise>
                ORDER BY a.update_date DESC
            </otherwise>
        </choose>
    </select>


    <insert id="insert">
        INSERT INTO ${tableName}(
        <#list list as column>
            ${column["name"]}<#if column_has_next>,</#if>
        </#list>
        ) VALUES (
        <#list list as column>
            ${"#\{"+column["javaField"]+"}"}<#if column_has_next>,</#if>
        </#list>
        )
    </insert>

    <update id="update">
        UPDATE ${tableName} SET
        <#list list as column>
            ${column["name"]+"=#\{"+column["javaField"]+"}"}<#if column_has_next>,</#if>
        </#list>
        WHERE id = ${r'#{id}'}
    </update>

    <update id="delete">
        DELETE FROM ${tableName}
        WHERE id =  ${r'#{id}'}
    </update>
    <update id="logicDelete">
        UPDATE ${tableName} SET del_flag = 1
        WHERE id = ${r'#{id}'}
    </update>
</mapper>