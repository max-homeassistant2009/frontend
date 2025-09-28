import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { Receipt } from "../data";
import { FaReceipt } from "react-icons/fa";

interface Props {
  data: Receipt[];
}

export const CustomTable = ({ data }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Artikel</TableCell>
            <TableCell>Menge</TableCell>
            <TableCell>Preis (€)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((receipt) =>
            receipt.groceries.map((grocery, index) => (
              <TableRow key={`${receipt.id}-${index}`}>
                <TableCell>{grocery.name}</TableCell>
                <TableCell>{grocery.quantity}</TableCell>
                <TableCell>{grocery.price.toFixed(2)}€</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
