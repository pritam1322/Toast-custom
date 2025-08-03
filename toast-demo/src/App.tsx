
import { useState } from 'react'
import './App.css'
import { AlertTriangle, CheckCircle, CircleAlert, Info, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';


interface Toast{
  id:string;
  message: String;
  color:String;
  icon: React.ReactNode;
}

function App() {

  const [toastVisible, setToastVisible] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [toastList, setToastList] = useState<Toast[] | []>([]);

  const handleShowToast = (type : 'success' | 'warning' | 'error' | 'info') => {

    let newToast: Toast;
    const id = uuidv4();

    switch (type) {
      case 'success':
        newToast = {
          id,
          message: 'Success Operation completed.',
          color: 'bg-green-200 text-green-700',
          icon: <CheckCircle />,
        };
        break;
      case 'warning':
        newToast = {
          id,
          message: 'Warning Something may be wrong.',
          color: 'bg-yellow-200 text-yellow-700',
          icon: <AlertTriangle />,
        };
        break;
      case 'error':
        newToast = {
          id,
          message: 'Error Something failed.',
          color: 'bg-red-200 text-red-700',
          icon: <CircleAlert />,
        };
        break;
      case 'info':
      default:
        newToast = {
          id,
          message: 'Info This is an informational message.',
          color: 'bg-gray-200 text-gray-700',
          icon: <Info />,
        };
        break;
      }
    
    setToastList((prev)=>[...prev, newToast]);
    //setToast(newToast);
    //setToastVisible(true);

    setTimeout(() => {
      //setToastVisible(false);
      setToastList((prev)=> prev.filter((toast)=> toast.id != id));
    }, 3000);
  };

  function removeToast(toastId: string) {
    setToastList((prev)=> prev.filter((toast)=>toast.id != toastId));
  }

  return (
    <>
      <section className='flex gap-3'>
        <button className='' onClick={()=> handleShowToast('success')}> 
          Show Toast Success
        </button>
        <button className='' onClick={()=> handleShowToast('warning')}> 
          Show Toast Warning
        </button>
        <button className='' onClick={()=> handleShowToast('error')}> 
          Show Toast Error
        </button>
        <button className='' onClick={()=> handleShowToast('info')}> 
          Show Toast Info
        </button>

        {/* {toastVisible && toast && (
          <div className={`flex items-center gap-3 absolute top-5 right-10 border p-4 rounded-lg shadow-lg ${toast.color}`}>
            {toast.icon}
            <span>{toast.message}</span>
          </div>
        )} */}
        {/* Toast Stack */}
        <div className="fixed top-5 right-10 space-y-4 z-50 w-80 max-w-full">
          {toastList.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-start justify-between p-2 border-l-4 rounded-md shadow-lg animate-slide-in ${toast.color}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{toast.icon}</div>
                <span className="text-sm font-medium leading-snug">
                  {toast.message}
                </span>
              </div>

              <div
                  onClick={() => removeToast(toast.id)}
                  className="ml-3 p-1 rounded cursor-pointer hover:scale-115 transition"
                  role="button"
                  aria-label="Close"
                >
                  <X className="h-4 w-4 text-gray-900 hover:text-black" />
                </div>
            </div>
          ))}
        </div>

        
      </section>
    </>
  )
}

export default App
