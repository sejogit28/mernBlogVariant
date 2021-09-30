import React, {useState} from 'react'
import {Row, Col, Typography,  Form, Input, InputNumber ,Button, Checkbox} from 'antd'

import { blogPostModel } from '../../state/actionDefinitions/actionBlogPostModel';
import Tags from './tagEnum';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

/* 
import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
 */

const {Title} = Typography;



/* interface Props {
    
} */



const BlogPostCreate = () : JSX.Element => {
    const layout = 
    {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },    
    };

   

    const [blogPostValues, setBlogPostValues] = useState<blogPostModel>(
    {
        title: "",
        author: "",
        summary: "",
        body: "",
        imageUrl: "",
        cloudinaryId:  "",
        readTime: 0,
        tags: [],
    })

    const onInputChange = (e : React.ChangeEvent<HTMLInputElement>) => 
    {
        setBlogPostValues({...blogPostValues, [e.target.name] : e.target.value});
        console.log(e.target.value);
    }

    const onTextAreaChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => 
    {
        setBlogPostValues({...blogPostValues, [e.target.name] : e.target.value});
        console.log(e.target.value);
    }


    const onNumberChange = (e : React.ChangeEvent<HTMLInputElement>) => 
    {
        setBlogPostValues({...blogPostValues, [e.target.name] : parseInt(e.target.value)});
        console.log(e.target.value);
    }

    const onCheckBoxChange = (e: CheckboxChangeEvent) => 
    {
        
        let checkedVal  = e.target.value;

        function clearTags(tagsArr: any[], value: string | undefined)
        {
            return tagsArr.filter((tag) =>
            {
                return tag !== value;
            });
        }

        
        if(e.target.checked)
        {
            //Array.push returns a number while concat returns a new array
            let newArray = blogPostValues.tags.concat(checkedVal)
            setBlogPostValues({...blogPostValues, tags: newArray});
            console.log(blogPostValues.tags)
        }
        else
        {
            let result = clearTags(blogPostValues.tags, checkedVal);
            setBlogPostValues({...blogPostValues, tags: result});
            console.log(blogPostValues.tags);
        }
    }


    return (
        <>
        <Row>
            <Col span={24}>
                <Title className='Page-heading' underline={true} level={1}>
                    Blog Post Create Page
                </Title>            
            </Col>
        </Row>
       
           
            <Form {...layout}  name="nest-messages" >
                <Form.Item name='Title' label="Title" rules={[{ required: true }]}>
                    <Input onChange={onInputChange}/>
                </Form.Item>
                <Form.Item wrapperCol={{span: 8}} name='authorName' label="Author Name" rules={[{ required: true }]}>
                    <Input onChange={onInputChange}/>
                </Form.Item>
                <Form.Item name='summary' label="Summary" rules={[{ required: true }]}>
                    <Input onChange={onInputChange}/>
                </Form.Item>
                <Form.Item name='content' label="Content" rules={[{ required: true, message: 'Write away!!!'}]}>
                    <Input.TextArea onChange={onTextAreaChange}/>
                </Form.Item>
                <Form.Item wrapperCol={{span: 1}} name='readTime' label="Read Time" rules={[{ required: true }]}>
                    <Input onChange={onNumberChange}/>
                </Form.Item>
                <Form.Item name="tags" label="Tags" rules={[{ required: true }]} >
                    <Checkbox.Group >
                    <Row>
                        {
                            Object.values(Tags).map((tag)=>
                            {
                                return(
                                        <Col span={12}>
                                            <Checkbox onChange={onCheckBoxChange} name={tag} value={tag} style={{ lineHeight: '2.5em' }}>
                                                {tag}
                                            </Checkbox>
                                        </Col>
                                )
                            })
                        }                        
                    </Row>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item >
                    <Row>
                        <Col span={24}>                        
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form> 
            
      
        </>
    )
}

export default BlogPostCreate;
