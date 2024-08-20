import  Button from 'react-bootstrap/Button';
import  Badge  from 'react-bootstrap/Badge';
import  Stack  from 'react-bootstrap/Stack';

export default function SummaryAll({correct, wrong, skipped}){

  return(
    <div className="d-flex align-items-center justify-content-center text-center min-vh-20">
      <div>
    <Stack direction="horizontal" gap={5}>
      <Button
        variant="success"
      > Correct <Badge bg='secondary'>{correct}</Badge>
      </Button>
      <Button
        variant="danger"
      > Wrong <Badge bg='secondary'>{wrong}</Badge>
      </Button>
      <Button
        variant="info"
      > Skipped <Badge bg='secondary'>{skipped}</Badge>
      </Button>
      </Stack>
      <p></p>
      </div>
    </div>
  );
}