import React, {useState} from 'react';

import { bindActionCreators } from 'redux';
import { useDispatch, useSelector} from 'react-redux';

import {Row, Col, Typography,  Form, Input ,Button, Checkbox, Upload, notification, Divider, Space} from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { UploadOutlined, RadiusBottomleftOutlined } from '@ant-design/icons';

import { actionCreators, State } from '../../state/stateIndex';
import { blogPostModel } from '../../state/actionDefinitions/actionBlogPostModel';
import Tags from './tagEnum';

/* 
import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
 */

const {Title} = Typography;

const BlogPostCreate = () : JSX.Element => 
{
    const dispatch = useDispatch();
    const {createBlogPost} = bindActionCreators(actionCreators, dispatch);
    // The line below can be used to track the state as you update it
    //const state = useSelector((state: State) => state.blogPostState)
    const layout = 
    {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },    
    };

   

    let [blogPostValues, setBlogPostValues] = useState<blogPostModel>(
    {
        title: "",
        author: "",
        summary: "",
        body: "",
        imageUrl: "",
        cloudinaryId:  "",
        readTime: "",
        tags: [],
    })

    const [file, setFile] = useState<any>([]);
    const [message, setMessage] = useState<any>(
        {
            noteMessage: "",
            noteDescription: "",
            notePlacement: "",
            duration: 0
        });



    const openNotification = (/* placement: any */) => 
    {
         setMessage({
                noteMessage: "Success",
                noteDescription: "Article Posted!",
                notePlacement: "bottomLeft",
                duration: 4         
            })

        notification.info({
        message: message.noteMessage,
        description: message.noteDescription,
        placement: message.notePlacement,
        duration: message.duration
        });
        
    };
    
    const onInputChange = (e : React.ChangeEvent<HTMLInputElement>) => 
    {
        setBlogPostValues({...blogPostValues, [e.target.name] : e.target.value});
        console.log(e.target.name);
        console.log(e.target.value);
    }

    const onTextAreaChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => 
    {
        setBlogPostValues({...blogPostValues, [e.target.name] : e.target.value});
        console.log(e.target.name);
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

    const normFile = (e: any) => 
    {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        if(e.fileList[0] != null)
        {
            setFile(e.fileList[0]);
        }
        
        console.log(file);
        return e && e.fileList;
    };

    /*
    const onFileChange = (e: any) => 
    {
        setFile(e.target.files[0]);
    } 
    */

    const dismissMessage = () => 
    {
        setMessage(
        {
            noteMessage: "",
            noteDescription: "",
            notePlacement: "",
            duration: 0
        })
    }

    const dummyRequest = () => 
    {
        console.log("Dummy Rq")
    }
    const onSubmitForm = (e: any) => 
    {
       
        console.log(blogPostValues.tags);
        //e.preventDefault();
        
       
        if(false)
        {
            setMessage(
            {
                icon: "x",
                hidden: false,
                negative: true,
                header: "Error, article not posted",
                content: "Article body must have atleast fifty character"
            });
            
        }
        else
        {
            const formData = new FormData();
            formData.append("title", blogPostValues.title);
            formData.append("author", blogPostValues.author);
            formData.append("summary", blogPostValues.summary);
            formData.append("body",  blogPostValues.body);
            formData.append("readTime", blogPostValues.readTime);
            
            blogPostValues.tags.forEach(item =>
                {
                    formData.append('tags', item);
                });
                formData.append('blogImage', file.originFileObj);
                
            createBlogPost(formData);

            setMessage({
                noteMessage: "Success",
                noteDescription: "Article Posted!",
                notePlacement: "bottomLeft",
                duration: 4         
            })

            openNotification();

           /*  setTimeout(()=>
            {
                dismissMessage();
            }, 4000) */

            /* BlogPostService.addBlogPost(formData).then(data =>
            {              
                console.log(data);               
                props.history.push('/');                      
            }) */

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
       
           
            <Form {...layout}  encType="multipart/form-data" /* onSubmitCapture={onSubmitForm} */  onFinish={onSubmitForm} >

                <Form.Item name='title' label="Title" rules={[{ required: true }]}>
                    <Input name='title' onChange={e => onInputChange(e)}  value={blogPostValues.title} type="text"/>
                </Form.Item>

                <Form.Item wrapperCol={{span: 8}} name='author' label="Author Name" rules={[{ required: true }]}>
                    <Input name='author' onChange={e => onInputChange(e)} value={blogPostValues.author} type="text"/>
                </Form.Item>

                <Form.Item name='summary' label="Summary" rules={[{ required: true }]}>
                    <Input name='summary' onChange={e => onInputChange(e)} value={blogPostValues.summary} type="text"/>
                </Form.Item>

                <Form.Item name='body'   label="Content" rules={[{ required: true}]}>
                    <Input.TextArea name='body' onChange={e =>onTextAreaChange(e)} value={blogPostValues.body} />
                </Form.Item>

               <Form.Item
                    name="blogImage"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Upload blog a post photo here"
                    
                >
                    <Upload 
                    name="blogImage"   
                    listType="picture" 
                    beforeUpload={() => false} 
                    id="blogImage"
                    customRequest={dummyRequest}
                    >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{span: 1}} name='readTime' label="Read Time" rules={[{ required: true }]}>
                    <Input onChange={e => onNumberChange(e)} name='readTime' value={blogPostValues.readTime}/>
                </Form.Item>

                <Form.Item name="tags" label="Tags" rules={[{ required: true }]} >
                    <Checkbox.Group >
                    <Row>
                        {
                            Object.values(Tags).map((tag)=>
                            {
                                return(
                                        <Col span={12}>
                                            <Checkbox 
                                                onChange={onCheckBoxChange} 
                                                name={tag} 
                                                value={tag} 
                                                style={{ lineHeight: '2.5em' }}
                                            >
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
            
             <Divider />
    <Space>
      <Button type="primary" onClick={() => openNotification()}>
        <RadiusBottomleftOutlined />
        bottomLeft
      </Button>
      </Space>
        </>
    )
}

export default BlogPostCreate;
