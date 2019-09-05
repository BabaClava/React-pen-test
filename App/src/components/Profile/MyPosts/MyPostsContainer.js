import MyPosts from './MyPosts';
import { addPost } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
    }
}

const mapDispatchToProps = {
    onPostSend: addPost
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;