import Mock from 'mockjs'
//引入JSON数据(webpack默认对外暴露的：图片1、JSON数据格式)
import banner from './banner'
import floor from './floor'

//mock数据：第一个参数请求地址 第二个参数：请求数据
Mock.mock('/mock/banner', {
    code: 200,
    data: banner
});
Mock.mock('/mock/floor', {
    code: 200,
    data: floor
})