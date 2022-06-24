import Mock from 'mockjs';
import User from './data/user';  // 机构列表

Mock.mock('/user/menuList', 'get' ,User.getMenuList); // 查

export default Mock;
