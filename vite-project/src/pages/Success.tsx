import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DataGridforTree from "../components/datagrid";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

// Define the columns for the DataGrid
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "title",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "body",
    headerName: "Body",
    flex: 2,
  },
];

// Define the Post interface
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Fetch posts from the API
const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function DataGridDemo() {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!name || !email || !phone) {
      window.alert("Please fill in all the fields.");
      navigate("/");
    }
  }, [name, email, phone, navigate]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={posts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </Box>
      <div className="p-24 flex">
        <DataGridforTree />
      </div>
    </div>
  );
}
