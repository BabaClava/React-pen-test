import MyPosts from './MyPosts';
import { addPost } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';
import { getPosts } from '../../../redux/profile-selectors';

const mapStateToProps = (state) => {
    return {
        postsData: getPosts(state)
    }
}

const mapDispatchToProps = {
    onPostSend: addPost
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;