import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory, updateCategory } from '../redux/categorySlice';

import { toast } from 'react-toastify';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';

export default function ManageCategories() {
  const dispatch = useDispatch();
  const { list: categories, loading } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const handleEdit = async (cat) => {
    const { value: formValues } = await Swal.fire({
        title: 'Edit Category',
        html:
        `<input id="swal-input1" class="swal2-input" placeholder="Name" value="${cat.name}">` +
        `<textarea id="swal-input2" class="swal2-textarea" placeholder="Description">${cat.description || ""}</textarea>`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: '#2563eb',
        preConfirm: () => {
        return [
            document.getElementById('swal-input1').value.trim(),
            document.getElementById('swal-input2').value.trim(),
        ]
        }
    });

    if (formValues && formValues[0]) {
        const [name, description] = formValues;
        try {
        await dispatch(updateCategory({ id: cat._id, name, description })).unwrap();
        toast.success("Category updated!");
        } catch (err) {
        toast.error(err?.message || "Update failed");
        }
    }
    };

  const handleDelete = async (id) => {
    try {
        const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You can't undo this action!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f43f5e',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Yes, delete it!',
        background: '#fff',
        color: '#22223b'
        });
        if (result.isConfirmed) {
        await dispatch(deleteCategory(id)).unwrap();
        toast.success('Category deleted!');
        }
    } catch (err) {
        toast.error(err?.message || 'Failed to delete category');
    }
    };
  

  return (
    <div className="manage-categories-bg">
      <div className="form-card" style={{ maxWidth: 500 }}>
        <h2 className="form-title">Manage <span className="accent">Categories</span></h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul style={{ paddingLeft: 0 }}>
            {categories.map(cat => (
              <li key={cat._id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid #ffe4e6', padding: '10px 0'
              }}>
                <span>
                  <b>{cat.name}</b> {cat.description && (<span style={{ color: "#ba0f38" }}>- {cat.description}</span>)}
                </span>
                <button
                    className="post-edit-btn"
                    style={{ background: "#e0e7ff", color: "#2563eb", marginLeft: 10 }}
                    onClick={() => handleEdit(cat)}
                    title="Edit Category"
                    >
                    Edit
                </button>

                <button
                  className="post-delete-btn"
                  style={{ background: "#fee2e2", color: "#be123c", marginLeft: 10 }}
                  onClick={() => handleDelete(cat._id)}
                  title="Delete Category"
                >
                  Delete
                </button>
              </li>
            ))}
            {categories.length === 0 && <li>No categories.</li>}
          </ul>
        )}
      </div>
    </div>
  );
}
