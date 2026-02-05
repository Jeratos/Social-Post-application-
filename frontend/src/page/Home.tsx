import { Container } from "react-bootstrap";
import Post from "./post/Post";

export default function home() {
  return (
    <Container className="mt-5 mb-5 pt-3">
      <Post />
    </Container>
  );
}
