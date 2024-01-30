import React, { Component } from 'react'
import Sidebar, { Sidebarc } from './Sidebar'
import { AppBar, Box, Container, MenuItem,Divider,CircularProgress,Backdrop, Grid, Paper, Typography,LinearProgress ,TextField, Button,Table,TableCell,TableContainer,TableRow,TableBody,TableHead} from '@mui/material'
import Appheader, { Appheaderc } from './Appheader'
import Chat from './Chat'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Chart from 'react-apexcharts'
import moment from 'moment'
import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

import { ThreeCircles } from  'react-loader-spinner'

const drawerWidth = 240;












export class Dashboard extends Component {
constructor(props) {
  super(props)

  this.state = {

is_loader_open:true,







seriesRadialopen: [76],
optionsRadialopen: {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: "#fff",
          strokeWidth: "70%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -5,
            show: true,
            color: "#888",
            fontSize: "10px"
          },
          value: {
            formatter: function (val) {
              return val;
            },
            color: "#05507a",
            fontSize: "16px",
            fontWeight:'800',
            offsetY: -4,
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ff7d1e"],
        inverseColors: true,
       
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Open"]
  },





seriesRadialhold: [76],
optionsRadialhold: {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: "#fff",
          strokeWidth: "70%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -5,
            show: true,
            color: "#888",
            fontSize: "10px"
          },
          value: {
            formatter: function (val) {
              return val;
            },
            color: "#05507a",
            fontSize: "16px",
            fontWeight:'800',
            offsetY: -4,
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#00c6c6"],
        inverseColors: true,
       
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Hold"]
  },




seriesRadialsongoing: [76],
optionsRadialongoing: {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: "#fff",
          strokeWidth: "70%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -5,
            show: true,
            color: "#888",
            fontSize: "10px"
          },
          value: {
            formatter: function (val) {
              return val;
            },
            color: "#05507a",
            fontSize: "16px",
            fontWeight:'800',
            offsetY: -4,
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
       
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["On Going"]
  },






seriesRadialcompleted: [76],
optionsRadialscompleted: {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: "#fff",
          strokeWidth: "70%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -5,
            show: true,
            color: "#888",
            fontSize: "10px"
          },
          value: {
            formatter: function (val) {
              return val;
            },
            color: "#05507a",
            fontSize: "16px",
            fontWeight:'800',
            offsetY: -4,
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#2da802"],
        inverseColors: true,
       
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["completed"]
  },


















    optionss: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,2000,2001]
      }
    },
    seriess: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91,72,47,55]
      }
    ],
  





    series: [{
      name: 'TEAM A',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    }, {
      name: 'TEAM B',
      type: 'area',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }, {
      name: 'TEAM C',
      type: 'line',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
       
          toolbar: {
            show: false
          
        },
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
        '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
      ],
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        title: {
          text: 'Points',
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
      
          }
        }
      }
    },
  
  







    seriesRadial: [76],
    optionsRadial: {
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "80%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -20,
              show: true,
              color: "#888",
              fontSize: "13px"
            },
            value: {
              formatter: function (val) {
                return val;
              },
              color: "#111",
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
         
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Progression"]
    },
    seriesRadial: [76],
    optionsBar: {
      chart: {
        stacked: true,
        stackType: "100%",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        dropShadow: {
          enabled: true
        }
      }
    }
          
  }
}



componentDidMount(){



}


  render() {
    return (
      <div>


        <Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>

<Box sx={{p:{xs:1,sm:3}, mt:6}}>

<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,marginLeft:1,fontWeight:'500',color:'#3e3e40'}}>Dashboard</Typography>


<Grid container spacing={{xs:1,sm:2,md:2}}>
  <Grid item xs={12} sm={6} md={3}>
<Paper elevation={1} sx={{height:110,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>TOTAL CAMPAIGN</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:0.5}}>360</Typography>

<Box sx={{width:'100%',height:40,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:40,width:40,backgroundColor:'#fff0d3',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center',mb:5}}>

<LanguageOutlinedIcon sx={{height:35,width:35,color:'#ffb621'}}/>

  </Box>
</Box>

</Box>
</Paper>
  </Grid>


  <Grid item xs={12}  sm={6} md={3}>
<Paper elevation={1} sx={{height:110,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>ON GOING CAMPAIGN</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>360</Typography>
<Box sx={{width:'100%',height:40,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:40,width:40,backgroundColor:'#ccedff',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>
<LanguageOutlinedIcon sx={{height:35,width:35,color:'#00a3ff'}}/>
  </Box>
</Box>
</Box>
</Paper>
  </Grid>

  <Grid item xs={12}  sm={6} md={3}>
<Paper elevation={1} sx={{height:110,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>TOTAL CLIENT</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>360</Typography>
<Box sx={{width:'100%',height:40,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:40,width:40,backgroundColor:'#ccedff',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>
<LanguageOutlinedIcon sx={{height:35,width:35,color:'#00a3ff'}}/>
  </Box>
</Box>
</Box>
</Paper>
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
<Paper elevation={1} sx={{height:110,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'bold',color:'#3e3e40'}}>DUE PAYMENT</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>Rs. 36000.00</Typography>
<Box sx={{width:'100%',height:40,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:40,width:40,backgroundColor:'#ffd7e4',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>
<LanguageOutlinedIcon sx={{height:35,width:35,color:'#fe3879'}}/>
  </Box>
</Box>
</Box>
</Paper>
  </Grid>
</Grid>














<br/>








<Grid container spacing={1} >
  <Grid item xs={12}  sm={12} md={6}>
<Box sx={{minHeight:260,width:'100%',}}>
<Paper component={Grid} elevation={1} sx={{width:'100%',minHeight:260,backgroundColor:'#fff',display:'flex',flexDirection:{xs:'column',sm:'column'}}}>
<Typography sx={{fontSize:15,fontWeight:'700',color:'#848383',fontSize:15,padding:1.5}}>Campaign Overview</Typography>
<Divider/>
<Grid container spacing={0}>
<Grid item xs={12} sm={12} md={5}>
  <Box sx={{height:'100%',width:'100%',backgroundColor:'#fff'}}>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>

  <Chart
              options={this.state.optionsRadial}
              series={this.state.seriesRadial}
              type="radialBar"
              width="280"
            /> 
  </Box>
  </Box>
</Grid>

<Grid item xs={12} sm={12} md={7}>
  <Box sx={{dispaly:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
   
<Grid container>
<Grid item xs={6}>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
   <Chart
              options={this.state.optionsRadialopen}
              series={this.state.seriesRadialopen}
              type="radialBar"
              width="150"
            />  
  </Box>

</Grid>

<Grid item xs={6}>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
   <Chart
              options={this.state.optionsRadialhold}
              series={this.state.seriesRadialhold}
              type="radialBar"
              width="150"
            />  
  </Box>

</Grid>



<Grid item xs={6}>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
   <Chart
              options={this.state.optionsRadialongoing}
              series={this.state.seriesRadialsongoing}
              type="radialBar"
              width="150"
            />  
  </Box>
</Grid>


<Grid item xs={6}>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%',}}>
   <Chart
              options={this.state.optionsRadialscompleted}
              series={this.state.seriesRadialcompleted}
              type="radialBar"
              width="150"
            />  
  </Box>
</Grid>
</Grid>
  </Box>
</Grid>
</Grid>
</Paper>


<Paper sx={{marginTop:1,width:'100%',minHeight:200}}>
<Box>
  <Typography sx={{fontSize:15,fontWeight:'700',color:'#8e8e93',padding:1,marginRight:2}}>Invoice Overview</Typography>
</Box>
<Divider sx={{marginLeft:2,marginRight:2}}/>
<Box sx={{width:'100%'}}>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
<Box sx={{minHeight:200,ml:1,mr:1}}>


<Typography sx={{fontSize:15,fontWeight:'700',color:'#848383',padding:1,}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                aria-disabled
                value={10}
                sx={{
                  height: 8,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#2da804",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:13,fontWeight:'500',color:'#8e8e93',padding:1}}>₹45,0000</Typography>


<Typography sx={{fontSize:15,fontWeight:'700',color:'#848383',padding:1}}>Partially Paid</Typography>
<LinearProgress
                variant="determinate"
                value={20}
                sx={{
                  height: 8,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#3793ff",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:13,fontWeight:'500',color:'#8e8e93',padding:1,}}>₹40,50006</Typography>


<Typography sx={{fontSize:15,fontWeight:'700',color:'#848383',padding:1,}}>Draft</Typography>
<LinearProgress
                variant="determinate"
                value={70}
                sx={{
                  height: 8,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#2da804",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:13,fontWeight:'500',color:'#8e8e93',padding:1}}>₹0.0000</Typography>

</Box>
  </Grid>
  <Grid item xs={12} sm={6}>
  <Box sx={{minHeight:200,ml:1,mr:1}}>
  <Typography sx={{fontSize:15,fontWeight:'700',color:'#848383',padding:1}}>Not Paid</Typography>
<LinearProgress
                variant="determinate"
                value={40}
                aria-disabled
                sx={{
                  height: 8,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#f72b2b",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:13,fontWeight:'500',color:'#8e8e93',padding:1,}}>₹55,000067</Typography>


<Typography sx={{fontSize:15,fontWeight:'700',color:'#848383',padding:1}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                value={60}
                sx={{
                  height: 8,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#33339c",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:13,fontWeight:'500',color:'#8e8e93',padding:1,}}>₹55,000067</Typography>


<Box sx={{padding:1,display:'flex',justifyContent:'space-between'}}>
<Box sx={{}}>
<Typography sx={{fontSize:15,fontWeight:'600',color:'#3d3b3b',padding:0.5}}>Total Invoice</Typography>
<Typography sx={{fontSize:15,fontWeight:'600',color:'#3d3b3b',paddingLeft:0.5,paddingRight:0.5}}>₹5.000</Typography>
</Box>

<Box sx={{}}>
<Typography sx={{fontSize:15,fontWeight:'600',color:'#3d3b3b',padding:0.5}}>Due</Typography>
<Typography sx={{fontSize:15,fontWeight:'600',color:'#3d3b3b',paddingLeft:0.5,paddingRight:0.5}}>₹8.000</Typography>
</Box>
</Box>


</Box>
  </Grid>
</Grid>

</Box>
</Paper>
</Box>
</Grid>


  
<Grid item xs={12} sm={12} md={6}>
<Box sx={{minHeight:280,width:'100%'}}>
<Paper sx={{width:'100%',minHeight:300}}>
  <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
  <Typography sx={{fontSize:15,fontWeight:'700',color:'#848383',fontSize:15,padding:1}}>Income vs Expenses</Typography>
  <TextField size='small'select sx={{minWidth:120,padding:0.5}} InputProps={{sx:{fontWeight:'600',color:'#848383',fontSize:13}}}>
  {[{id:1,ss:"Weekly"},{id:2,ss:"Monthly"},{id:3,ss:"Yearly"}].map((option) => (
            <MenuItem key={option.id} value={option.ss}>
              {option.ss}
            </MenuItem>
          ))}
  </TextField>
  </Box>
 
  <Divider/>

<Chart options={this.state.options}  series={this.state.series} type="line" height={211} />

 <Box sx={{display:'flex',justifyContent:'space-between',padding:2}}>
  <Typography sx={{fontSize:18,fontWeight:'500',display:'flex',flexDirection:'row'}}> <Typography sx={{fontSize:20,fontWeight:'600',color:'blue',marginRight:2}}>$34000</Typography> Income </Typography>
  <Typography sx={{fontSize:18,fontWeight:'500',display:'flex',flexDirection:'row'}}> <Typography sx={{fontSize:20,fontWeight:'600',color:'blue',marginRight:2}}>$34000</Typography> Spend </Typography>
</Box>   
</Paper>


<Box sx={{width:'100%',minHeight:230,mt:1,elevation:1}} >
<Grid container spacing={0.5}>
<Grid item xs={12} sm={5}>
<Paper sx={{height:214,width:'100%',backgroundColor:'#fff'}}>

<Typography sx={{fontSize:13,fontWeight:'600',textAlign:'center',paddingTop:1}}>Ticket Status</Typography>
<Divider sx={{marginLeft:2,marginRight:2}}/>
<Box sx={{display:'flex',justifyContent:'space-between',padding:2,flexDirection:'column'}}>

  <Box sx={{display:'flex',flexDirection:'row',mt:2,mb:1}}>
<WorkspacesIcon sx={{color:'blue',height:17,width:17}}/>
<Typography sx={{fontSize:15,fontWeight:'bold',ml:1}}>New</Typography>
<Typography sx={{marginLeft:5,fontSize:15,fontWeight:'bold'}}>018</Typography>
  </Box>

  <Box sx={{display:'flex',flexDirection:'row',mt:2,mb:1}}>
<WorkspacesIcon sx={{color:'red',height:17,width:17}}/>
<Typography sx={{fontSize:15,fontWeight:'bold',ml:1}}>Open</Typography>
<Typography sx={{marginLeft:4,fontSize:15,fontWeight:'bold'}}>018</Typography>
  </Box>

  <Box sx={{display:'flex',flexDirection:'row',mt:2,mb:1}}>
<WorkspacesIcon sx={{color:'#ffc809',height:17,width:17}}/>
<Typography sx={{fontSize:15,fontWeight:'bold',ml:1}}>Close</Typography>
<Typography sx={{marginLeft:4,fontSize:15,fontWeight:'bold'}}>018</Typography>
  </Box>


</Box>
</Paper>
</Grid>

<Grid item xs={12} sm={7}>
<Paper sx={{height:214,width:'100%',backgroundColor:'#fff'}}>
<Typography sx={{fontSize:13,fontWeight:'600',textAlign:'center',paddingTop:1}}>Ticket Status</Typography>
<Chart
              options={this.state.optionss}
              series={this.state.seriess}
              type="bar"
              height={190}
              width='100%'
            />

</Paper>
</Grid>
</Grid>
</Box>
</Box>
</Grid>
</Grid>


<Grid container spacing={2}>
  <Grid item xs={12} sm={12} md={4}>
<Paper sx={{height:400,width:'100%',mt:{xs:2,sm:0}}}>
<Typography sx={{fontSize:15,fontWeight:'700',color:'#8e8e93',padding:1,marginLeft:2,marginRight:2}}>Campaign Timeline</Typography>
<Divider sx={{marginLeft:2,marginRight:2}}/>


<Box sx={{mt:1,mb:1,marginLeft:3,marginRight:3}}>
  <Box sx={{display:'flex',flexDirection:'row'}}>
<Typography sx={{fontSize:14,fontFamily:'sans-serif',fontWeight:'500',width:'70%',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>We have lead about we abnbb sdnjsd djsj j dsjdjh j sjhh</Typography>
<Typography sx={{marginLeft:2,fontSize:10,fontWeight:'600',color:'#c1c1c1',mt:0.5}}>Today's  { moment().format('mm:ss')}</Typography>
  </Box>
<Box sx={{height:18,width:55,backgroundColor:'#FFC809',mt:1,display:'flex',borderRadius:7,justifyContent:'center',alignItems:'center'}}>
<Typography sx={{fontSize:11,fontWeight:'bold',color:'white'}}>Added</Typography>
</Box>
</Box>

<Divider sx={{marginLeft:2,marginRight:2}}/>

<Box sx={{mt:1,mb:1,marginLeft:3,marginRight:3}}>
  <Box sx={{display:'flex',flexDirection:'row'}}>
<Typography sx={{fontSize:14,fontFamily:'sans-serif',fontWeight:'500',width:'70%',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>We have lead about we abnbb sdnjsd djsj j dsjdjh j sjhh</Typography>
<Typography sx={{marginLeft:2,fontSize:10,fontWeight:'600',color:'#c1c1c1',mt:0.6}}>Today's  { moment().format('mm:ss')}</Typography>
  </Box>
<Box sx={{height:18,width:55,backgroundColor:'#FFC809',mt:1,display:'flex',borderRadius:7,justifyContent:'center',alignItems:'center'}}>
<Typography sx={{fontSize:11,fontWeight:'bold',color:'white'}}>Added</Typography>
</Box>
</Box>

</Paper>
  </Grid>


<Grid item xs={12} sm={12} md={4}>
<Paper component={Grid} sx={{height:200,backgroundColor:'#fff'}}>
<Box sx={{height:'100%',width:'100%'}}>

<Grid container>
<Grid item xs={6}>
<Box sx={{backgroundColor:'#fff',width:'100%',height:100,display:'flex',justifyContent:'center',alignItems:'center'}}>
<Box>
<Typography sx={{fontSize:25,fontWeight:'bold',textAlign:'center',color:'skyblue'}}>12</Typography>
<Typography sx={{fontSize:14,fontweight:'bold',fontFamily:'sans-serif',color:'#8e8e93'}}>Team Member</Typography>
</Box>
</Box>
</Grid>


<Grid item xs={6}>
<Box sx={{backgroundColor:'#fff',width:'100%',height:100,display:'flex',justifyContent:'center',alignItems:'center'}}>
<Box>
<Typography sx={{fontSize:25,fontWeight:'bold',textAlign:'center',color:'#2cbd96'}}>12</Typography>
<Typography sx={{fontSize:14,fontweight:'bold',fontFamily:'sans-serif',color:'#8e8e93'}}>On Leave Today</Typography>
</Box>
</Box>
</Grid>

<Grid item xs={6}>
<Box sx={{backgroundColor:'#fff',width:'100%',height:100,display:'flex',justifyContent:'center',alignItems:'center'}}>
<Box>
<Typography sx={{fontSize:25,fontWeight:'bold',textAlign:'center',color:'#f72b2b'}}>12</Typography>
<Typography sx={{fontSize:14,fontweight:'bold',fontFamily:'sans-serif',color:'#8e8e93'}}>Team Member</Typography>
</Box>
</Box>
</Grid>


<Grid item xs={6}>
<Box sx={{backgroundColor:'#fff',width:'100%',height:100,display:'flex',justifyContent:'center',alignItems:'center'}}>
<Box>
<Typography sx={{fontSize:25,fontWeight:'bold',textAlign:'center',color:'#33339c'}}>12</Typography>
<Typography sx={{fontSize:14,fontweight:'bold',fontFamily:'sans-serif',color:'#8e8e93'}}>Team Member</Typography>
</Box>
</Box>
</Grid>

</Grid>
</Box>
</Paper>


<Paper component={Grid} sx={{height:196,backgroundColor:'#fff',mt:1}}>
<Typography sx={{fontSize:15,fontWeight:'bold',color:'#8e8e93',padding:1,marginLeft:1}}>Open Campaign</Typography>
<Divider sx={{marginLeft:2,marginRight:2,mb:1}}/>
<Box sx={{marginLeft:2,marginRight:2}}>
<Grid container sx={{mt:1,mb:1}} spacing={1}>
  <Grid xs={6}>
<Typography sx={{fontSize:15,fontWeight:'500'}}>campaign name</Typography>
  </Grid>
<Grid xs={6}>

<LinearProgress
                variant="determinate"
                value={60}
                sx={{
                  mt:1,
                  height:8,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#f72b2b",
                    borderRadius: "10px",
                  },
                }}
              />
</Grid>
</Grid>


<Grid container sx={{mt:1,mb:1}} spacing={1}>
  <Grid xs={6}>
<Typography sx={{fontSize:15,fontWeight:'500'}}>campaign name</Typography>
  </Grid>
<Grid xs={6}>

<LinearProgress
                variant="determinate"
                value={80}
                sx={{
                  mt:1,
                  height:8,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#3793ff",
                    borderRadius: "10px",
                  },
                }}
              />
</Grid>
</Grid>





</Box>

</Paper>
</Grid>





<Grid item xs={12} sm={12} md={4}>
<Paper sx={{height:400,width:'100%',backgroundColor:'#fff'}}>
<Typography sx={{fontSize:15,fontWeight:'700',color:'#8e8e93',padding:1,marginLeft:2,marginRight:2}}>To do</Typography>
<Divider sx={{marginLeft:2,marginRight:2,mb:1}}/>

<Box sx={{display:'flex',flexDirection:'row',border:1,borderRadius:2,height:30,borderColor:'#e7e7f3',marginLeft:2,marginRight:2,justifyContent:'center',alignItems:'center'}}>
  <TextField  
 sx={{backgroundColor:'#f2f8ff',height:30,borderRadius:2}}
 size='small' 
 fullWidth
 variant='standard'
placeholder='Enter details'
InputProps={{
  startAdornment: <AddOutlinedIcon sx={{color:'#c1c1c1',marginLeft:1}}/>,
  disableUnderline:true
}}
 />
<Box sx={{height:30,width:60,backgroundColor:'#2987c8',marginRight:-0.05,borderTopRightRadius:8,borderBottomRightRadius:8,display:'flex',justifyContent:'center',alignItems:'center'}}>
<Typography sx={{fontSize:10,fontWeight:'bold',color:'#fff'}}>SAVE</Typography>
</Box>
</Box>


<Box sx={{marginLeft:'40%',marginRight:2.4,mt:0.5}}>
<TextField  
 sx={{backgroundColor:'#f2f8ff',margin:0.5,borderRadius:2}}
 size='small' 
 variant='standard'
 fullWidth
 placeholder='search'
  InputProps={{
    startAdornment: <SearchIcon sx={{color:'#c1c1c1',marginLeft:1}}/>,
    disableUnderline:true
  }}
 />
</Box>



<Box sx={{marginLeft:1,marginRight:1}}>
<TableContainer component={Box}>
      <Table sx={{width:'100%' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize:14,fontWeight:'bold'}}>Title</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'bold'}}>Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'bold'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[{name:"nitish",date:"20-333-33"},{name:"nitish",date:"20-333-33"},{name:"nitish",date:"20-333-33"}].map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align='center'>{row.date}</TableCell>
              <TableCell align='center' ><Button size='small' variant='contained' disableElevation sx={{textTransform:'none',height:20}}>Action</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


</Box>






</Paper>
</Grid>
</Grid>



















</Box>
</Box>
</Box>


<Box sx={{display:'flex',position:'fixed',top:0,left:{xs:0,sm:240}}}>
<Appheaderc/>
</Box>


<Box sx={{display:{xs:'none',sm:'block'},position:'fixed',bottom:40,right:10}}>
 <Chat/> 
</Box>





      </div>
    )
  }
}

export default Dashboard

















/*

 <Chart
              options={this.state.optionsRadial}
              series={this.state.seriesRadial}
              type="radialBar"
              width="290"
            /> 

            */

























/*
import React, { Component } from 'react'
import Sidebar, { Sidebarc } from './Sidebar'
import { AppBar, Box, Container, Divider, Grid, Paper, Typography,LinearProgress } from '@mui/material'
import Appheader from './Appheader'
import Chat from './Chat'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Chart from 'react-apexcharts'

const drawerWidth = 240;




var options = {
  series: [70],
  chart: {
  height: 350,
  type: 'radialBar',
},
plotOptions: {
  radialBar: {
    hollow: {
      size: '70%',
    }
  },
},
labels: ['Cricket'],
};


export class Main extends Component {
constructor(props) {
  super(props)

  this.state = {



    series: [{
      name: 'TEAM A',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    }, {
      name: 'TEAM B',
      type: 'area',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }, {
      name: 'TEAM C',
      type: 'line',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
       
          toolbar: {
            show: false
          
        },
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
        '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
      ],
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        title: {
          text: 'Points',
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
      
          }
        }
      }
    },
  
  







    seriesRadial: [76],
    optionsRadial: {
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -20,
              show: true,
              color: "#888",
              fontSize: "13px"
            },
            value: {
              formatter: function (val) {
                return val;
              },
              color: "#111",
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
         
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Percent"]
    },
    seriesRadial: [76],
    optionsBar: {
      chart: {
        stacked: true,
        stackType: "100%",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        dropShadow: {
          enabled: true
        }
      }
    }
          
  }
}



  render() {
    return (
      <div>
        <Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' } }}>
<Appheader/>

<Box sx={{p:3, mt:6}}>

<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},marginLeft:1,fontWeight:'500',color:'#3e3e40'}}>Dashboard</Typography>


<Grid container spacing={{xs:2,sm:4}}>
  <Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:120,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>TOTAL COMPAIGN</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>360</Typography>

<Box sx={{width:'100%',height:45,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:45,width:45,backgroundColor:'#fff0d3',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>

<LanguageOutlinedIcon sx={{height:35,width:35,color:'#ffb621'}}/>


  </Box>
</Box>

</Box>
</Paper>
  </Grid>


  <Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:120,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40'}}>TOTAL CLIENT</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>360</Typography>
<Box sx={{width:'100%',height:45,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:45,width:45,backgroundColor:'#ccedff',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<LanguageOutlinedIcon sx={{height:35,width:35,color:'#00a3ff'}}/>
  </Box>
</Box>
</Box>
</Paper>
  </Grid>

  <Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:120,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5}}>
<Typography sx={{fontSize:12,fontWeight:'bold',color:'#3e3e40'}}>DUE PAYMENT</Typography>
<Typography sx={{fontSize:19,fontWeight:'550',fontFamily:'sans-serif',color:'#3e3e40',mt:1}}>Rs. 36000.00</Typography>
<Box sx={{width:'100%',height:45,display:'flex',justifyContent:'right'}}>
  <Box sx={{height:45,width:45,backgroundColor:'#ffd7e4',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<LanguageOutlinedIcon sx={{height:35,width:35,color:'#fe3879'}}/>
  </Box>
</Box>
</Box>
</Paper>
  </Grid>
</Grid>


<br/>



<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
<Box sx={{minHeight:500,width:'100%',}}>
<Paper elevation={1} sx={{width:'100%',minHeight:350,backgroundColor:'#fff',display:'flex',flexDirection:{xs:'column',sm:'row'}}}>


<Box sx={{minHeight:350, width:{xs:'100%',sm:'40%'},display:'flex',justifyContent:'center',alignItems:'center'}}>
<Chart
              options={this.state.optionsRadial}
              series={this.state.seriesRadial}
              type="radialBar"
              width="290"
            />
</Box>


</Paper>

<Paper sx={{marginTop:1,width:'100%',minHeight:200}}>
<Box>
  <Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Invoice Overview</Typography>
</Box>
<Divider sx={{}}/>
<Box sx={{width:'100%'}}>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
<Box sx={{minHeight:200,ml:1,mr:1}}>


<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1,}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                aria-disabled
                value={10}
                sx={{
                  height: 12,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#2da804",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>


<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                value={20}
                sx={{
                  height: 12,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#3793ff",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1,}}>Overdue</Typography>


<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1,}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                value={70}
                sx={{
                  height: 12,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#2da804",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>

</Box>
  </Grid>
  <Grid item xs={12} sm={6}>
  <Box sx={{minHeight:200,ml:1,mr:1}}>
  <Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                value={40}
                aria-disabled
                sx={{
                  height: 12,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#f72b2b",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1,}}>Overdue</Typography>

<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                value={50}
                sx={{
                  height: 12,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#f72b2b",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>

<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>
<LinearProgress
                variant="determinate"
                value={60}
                sx={{
                  height: 12,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#f72b2b",
                    borderRadius: "10px",
                  },
                }}
              />
<Typography sx={{fontSize:15,fontWeight:'700',color:'#3e3e40',padding:1}}>Overdue</Typography>

</Box>
  </Grid>
</Grid>







</Box>
</Paper>
</Box>
</Grid>







<Grid item xs={12} sm={6}>
<Box sx={{minHeight:400,width:'100%'}}>
<Paper sx={{width:'100%',minHeight:400}}>

<Chart options={this.state.options}  series={this.state.series} type="line" height={350} />

 <Box sx={{display:'flex',justifyContent:'space-between',padding:2}}>
  <Typography sx={{fontSize:18,fontWeight:'500',display:'flex',flexDirection:'row'}}> <Typography sx={{fontSize:23,fontWeight:'600',color:'blue',marginRight:2}}>$34000</Typography> Income </Typography>
  <Typography sx={{fontSize:18,fontWeight:'500',display:'flex',flexDirection:'row'}}> <Typography sx={{fontSize:23,fontWeight:'600',color:'blue',marginRight:2}}>$34000</Typography> Spend </Typography>
</Box>   
</Paper>


<Paper sx={{width:'100%',height:230,mt:1}}>





</Paper>

</Box>
</Grid>
</Grid>





<br/>

<Grid container spacing={2}>
  <Grid item xs={12} sm={4}>
<Paper sx={{height:400,width:'100%'}}>






</Paper>
  </Grid>

<Grid item xs={12} sm={4}>
<Paper sx={{height:400,width:'100%',backgroundColor:'red'}}>




</Paper>
</Grid>

<Grid item xs={12} sm={4}>
<Paper sx={{height:400,width:'100%',backgroundColor:'green'}}>




</Paper>
</Grid>




</Grid>



















</Box>
</Box>
</Box>


<Box sx={{display:'flex',position:'fixed',bottom:40,right:10}}>
 <Chat/> 
</Box>


      </div>
    )
  }
}

export default Main

*/
