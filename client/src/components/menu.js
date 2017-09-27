import {Component, PropTypes} from 'react'
import React from 'react'
import {Link} from 'react-router'

class Menu extends Component {

    render() {
        let menu = this.props;

        return (
            <div className="art">
                <h2>
                    <Link to={'/reading/' + article.id} className="title-link">{article.title}</Link>
                </h2>
                <div className="article-body" dangerouslySetInnerHTML={{__html: article.content}}></div>
                <p>
                    <Link to={'/reading/' + article.id} className="article-link">继续阅读全文&raquo;</Link>
                </p>

                <div className="art-info">
                    <span>{"作者:" + article.author + " "}</span>
                    <span>{"发表于:" + article.createtime + " "}</span>
                    <span>{"浏览:" + article.skim + " "}</span>
                    <span>{"回复:" + article.reply}</span>
                </div>
            </div>
        )

    }
}

export default Article;