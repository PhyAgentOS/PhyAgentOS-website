# Piper Robot Arm Quick Start

Set up PAOS, install the Skill, activate CAN, and start the real robot in order. Each command includes the state to check and any important precautions.

## 0. Install and configure PAOS

Complete the official PhyAgentOS-core 5-minute quick start first.

[Open the official 5-minute quick start](https://github.com/PhyAgentOS/PhyAgentOS-core#5-minute-quick-start)

**Ready to continue when PAOS is installed and you can chat through paos agent.**

## 1. Install the Skill

Run these commands in the same environment used to install PAOS, such as the same conda environment.

### Install the move-arm-by-ee Skill

```bash
paos skill install move-arm-by-ee
```

**Check the result：** After installation, inspect the Skill version and profiles with the next command.

### Inspect the version and available profiles

```bash
paos skill inspect move-arm-by-ee
```

**Check the result：** The output should list the version and all profiles, including piper_real.

### Check the initial installed state

```bash
paos skill status move-arm-by-ee
```

**Check the result：** State: not started is normal before connecting the real robot.

## 2. Connect hardware and activate CAN

Power on the arm and connect the USB-CAN adapter. The commands below use can0 as an example.

### List CAN interfaces and identify the actual device name

```bash
ip -details link show type can
```

**Check the result：** Look for a CAN interface such as can0. A DOWN state before activation is normal.

**Note：** If no interface appears, check the USB-CAN adapter and cable.

### Set the bitrate; this does not activate the interface

```bash
sudo ip link set can0 type can bitrate 1000000
```

**Check the result：** Continue with activation, then use the final status command to verify the result.

**Note：** Replace can0 in the commands below if your interface has a different name.

### Activate the CAN interface

```bash
sudo ip link set can0 up
```

**Check the result：** The interface should change from DOWN to UP. Check its actual state next.

### Check the CAN interface state

```bash
ip -details link show can0
```

**Check the result：** Look for state UP. Resolve interface problems before starting the Skill.

## 3. Start the real Piper profile

piper_real selects the Piper hardware runtime profile. Use the earlier inspect output to see other profiles.

### Start the Skill and connect the robot

```bash
paos skill start move-arm-by-ee -p piper_real
```

**Check the result：** After the driver connects, the arm moves to its initial pose. Then check Tool readiness in the next step.

**Note：** Clear the arm workspace and confirm emergency stop is available. The Dora CLI must be installed and on PATH.

## 4. Verify tool readiness

Check Runtime and Tool status before controlling the robot.

### Inspect Skill and Gateway status

```bash
paos skill status move-arm-by-ee
```

**Check the result：** Look for State: running, Gateway GET /tools: ready, and ready status for motion.resolve_relative_pose, motion.move_pose, and gripper.set_opening.

## 5. Chat with the Agent

The Skill must be running for the Agent to load arm tools. Choose either of these modes.

### Start interactive mode and enter an arm instruction

```bash
paos agent
```

**Check the result：** The Agent opens a conversation. You can ask it to raise the arm by 3 cm, move it forward by 3 cm, or open the gripper by 5 cm.

### Or send just one message

```bash
paos agent -m "Raise the arm by 3 cm"
```

**Check the result：** Sends one arm-raising request. This is an alternative to interactive mode; you do not need to run both commands.

## 6. Stop the Skill

Stop the Skill when you have finished controlling the robot.

### Stop move-arm-by-ee

```bash
paos skill stop move-arm-by-ee
```

**Check the result：** The arm returns to its initial pose before disconnecting.

**Note：** Keep the arm workspace clear while it stops.
