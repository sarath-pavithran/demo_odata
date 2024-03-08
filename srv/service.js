const cds = require('@sap/cds');
const dltPromises = [];
var deleteCount = 0;
debugger
module.exports = cds.service.impl(async function () {
    / SERVICE ENTITIES /
    let {
        task
    } = this.entities;
    const c4re = await cds.connect.to('iflow');
    var readsupp = true;
    this.before('READ', task, async (req) => {
        if (readsupp) {
            try {
                const resp = await c4re.get('/odata/v4/my/task');
                debugger
                await DELETE.from(task);
                const dt = resp.value;
                const entry = [];
                for(var i = 0; i < dt.length; i += 1) {
                    entry.push({
                        plant:dt[i].plant,
                        SBG:dt[i].SBG,
                        SBU:dt[i].SBU
                      });
                }
                
                await INSERT.into(task).entries(entry);
                readsupp = false;
            } catch(error) {
                req.error
            }
        }
    });
    debugger;
    this.on("DELETE", task , async(req,next) => {
        deleteCount += 1;
        const dt = req.data;
        const lv_plant = dt.plant;
        let lv_url = "/odata/v4/my/task(plant='"+lv_plant+"')";
        dltPromises.push(c4re.delete(lv_url));

        debugger;
        // try {
        //     const dt = req.data;
        //     const lv_plant = dt.plant;
        //     let lv_url = "/odata/v4/my/task(plant='"+lv_plant+"')";
        //     try {
        //     const resp = await c4re.get(lv_url);
        //     await c4re.delete(lv_url);
              
        //     }
        //     catch(error) {
        //         if (error.statusCode && error.statusCode === 502) {
        //             console.log('Record not found with plant:', lv_plant);
        //             // You can handle this scenario as needed, such as returning a specific error message
        //             req.error(502, 'Record not found');
        //         }
        //     }

            

        // }

        // catch (error) {

        //     console.error('Error during Delete operation on Parent entity:', error);
        //     req.error(500, 'Internal Server Error');
        // }



    });
    this.after("DELETE", task , async(next) => {
        deleteCount -= 1;
        debugger

      try {
        if (deleteCount == 0) {
        await Promise.all(dltPromises);
        }
      }
      catch(error) {
        console.error("Error",error)    }

    });
     this.on('CREATE', task, async(req) => {
        debugger;
        const entry = {
            plant : req.data.plant,
            SBG : req.data.SBG,
            SBU : req.data.SBU,
        }
        let lv_url = "/odata/v4/my/task";
        try {
            var resp = await c4re.post(lv_url,entry);
            debugger;
        }
        catch(error) {
            console.error("Couldn't Instert bro");
        }
        const resp_dt = {
            plant:resp.plant,
            SBG : resp.SBG,
            SBU : resp.SBU,

        }
        return resp_dt;
     });
     this.on('UPDATE', task, async(req) => {
        debugger;
        const dt = req.data;
        entry = {
            plant : dt.plant,
            SBG : undefined,
            SBU : undefined
        }
        
        if( dt.SBG != null) {
            entry.SBG = dt.SBG;
        }

        if( dt.SBU != null) {
            entry.SBU = dt.SBU;
        }
        const lv_url =  "/odata/v4/my/task/"+dt.plant;
        try {
          await UPDATE(task).set(entry).where({plant : dt.plant});
          var resp = await c4re.patch(lv_url,entry);
        }
        catch(error) {
            console.error("Clashed");
        }
        return req.data;
     });
    
});
